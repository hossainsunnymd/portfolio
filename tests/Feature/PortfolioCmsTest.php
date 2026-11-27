<?php

use App\Models\Contact;
use App\Models\ProjectCategory;
use App\Models\Projects;
use App\Models\Section;
use App\Models\Service;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

it('serves published database projects with category and search filters', function () {
    $category = ProjectCategory::query()->create([
        'name' => 'Applications',
        'slug' => 'applications',
        'position' => 1,
    ]);

    Projects::query()->create([
        'project_category_id' => $category->id,
        'title' => 'Inventory Portal',
        'slug' => 'inventory-portal',
        'summary' => 'Inventory management',
        'status' => 'published',
        'position' => 1,
    ]);

    Projects::query()->create([
        'title' => 'Draft Project',
        'slug' => 'draft-project',
        'status' => 'draft',
        'position' => 2,
    ]);

    $this->get('/projects?category=applications&q=inventory')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('frontend/projects/Index')
            ->where('projects.data.0.slug', 'inventory-portal')
            ->where('selectedCategory', 'applications')
            ->where('search', 'inventory')
            ->has('projects.data', 1));
});

it('validates and stores contact messages', function () {
    $invalid = [
        'name' => 'Visitor',
        'email' => 'not-an-email',
        'message' => 'I need a portfolio website.',
    ];

    $this->post('/contact', $invalid)
        ->assertSessionHasErrors('email');

    expect(Contact::query()->count())->toBe(0);

    $this->post('/contact', [
        ...$invalid,
        'email' => 'visitor@example.test',
        'phone' => '',
        'company' => '',
        'subject' => '',
        'budget' => '',
    ])->assertRedirect()
        ->assertSessionHas('success');

    $this->assertDatabaseHas('contacts', [
        'email' => 'visitor@example.test',
        'status' => 'new',
    ]);
});

it('requires authentication for CMS access and permits an authenticated resource edit', function () {
    $this->get('/admin')->assertRedirect('/login');

    $user = User::factory()->create();
    $service = Service::query()->create([
        'title' => 'Original service',
        'slug' => 'original-service',
        'icon' => 'sparkles',
        'status' => 'published',
        'position' => 1,
    ]);

    $this->actingAs($user)
        ->put("/admin/services/{$service->id}", [
            'title' => 'Updated service',
            'slug' => 'updated-service',
            'icon' => 'sparkles',
            'summary' => null,
            'body' => null,
            'features' => ['Database-driven content'],
            'is_featured' => true,
            'status' => 'published',
            'position' => 1,
        ])
        ->assertRedirect(route('admin.resources.index', 'services'))
        ->assertSessionHas('success');

    $this->assertDatabaseHas('services', [
        'id' => $service->id,
        'slug' => 'updated-service',
    ]);
});

it('can safely seed portfolio content more than once', function () {
    $this->seed(DatabaseSeeder::class);
    $counts = [
        DB::table('sections')->count(),
        DB::table('projects')->count(),
        DB::table('services')->count(),
    ];

    $this->seed(DatabaseSeeder::class);

    expect([
        DB::table('sections')->count(),
        DB::table('projects')->count(),
        DB::table('services')->count(),
    ])->toBe($counts);
});

it('renders public pages using the portfolio records', function () {
    $this->seed(DatabaseSeeder::class);

    $this->get('/')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('frontend/Home')
            ->has('sections')
            ->has('projects')
            ->has('services'));

    $this->get('/about')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('frontend/About')
            ->has('experiences')
            ->has('skills'));

    $this->get('/services')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('frontend/services/Index')
            ->has('services'));

    $this->get('/services/show?slug=laravel-development')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('frontend/services/Show')
            ->where('service.slug', 'laravel-development'));

    $this->get('/projects/show?slug=ideal-fibre-inventory-management')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('frontend/projects/Show')
            ->where('project.slug', 'ideal-fibre-inventory-management'));

    $this->get('/contact')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('frontend/Contact')
            ->where(
                'section.config.process_steps.0',
                'Review your message and project requirements.',
            ));
});

it('stores section images on the public disk and saves their URL', function () {
    Storage::fake('public');
    $section = Section::query()->create([
        'key' => 'hero',
        'name' => 'Home hero',
        'config' => [],
    ]);

    $this->actingAs(User::factory()->create())
        ->post(route('admin.sections.image', $section), [
            'image' => UploadedFile::fake()->image('hero.png'),
        ])
        ->assertRedirect(route('admin.resources.edit', ['sections', $section->id]))
        ->assertSessionHas('success');

    expect(Storage::disk('public')->allFiles('sections'))->toHaveCount(1)
        ->and($section->fresh()->config['image_path'])
        ->toContain('/storage/sections/');
});
