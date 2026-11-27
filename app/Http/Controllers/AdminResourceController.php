<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Contact;
use App\Models\Exprience;
use App\Models\ProjectCategory;
use App\Models\Projects;
use App\Models\Section;
use App\Models\Service;
use App\Models\Skill;
use App\Models\Testimonial;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Unique;
use Inertia\Inertia;
use Inertia\Response;

class AdminResourceController extends Controller
{
    private const RESOURCES = [
        'sections' => [
            'title' => 'Sections',
            'model' => Section::class,
            'order' => 'position',
            'fields' => [
                ['name' => 'key', 'label' => 'Key', 'type' => 'text', 'required' => true],
                ['name' => 'name', 'label' => 'Name', 'type' => 'text', 'required' => true],
                ['name' => 'heading', 'label' => 'Heading', 'type' => 'text'],
                ['name' => 'subheading', 'label' => 'Subheading', 'type' => 'textarea'],
                ['name' => 'enabled', 'label' => 'Enabled', 'type' => 'checkbox'],
                ['name' => 'position', 'label' => 'Position', 'type' => 'number'],
                ['name' => 'config', 'label' => 'Configuration (JSON)', 'type' => 'json'],
            ],
        ],
        'project-categories' => [
            'title' => 'Project categories',
            'model' => ProjectCategory::class,
            'order' => 'position',
            'fields' => [
                ['name' => 'name', 'label' => 'Name', 'type' => 'text', 'required' => true],
                ['name' => 'slug', 'label' => 'Slug', 'type' => 'text', 'required' => true],
                ['name' => 'description', 'label' => 'Description', 'type' => 'textarea'],
                ['name' => 'position', 'label' => 'Position', 'type' => 'number'],
            ],
        ],
        'projects' => [
            'title' => 'Projects',
            'model' => Projects::class,
            'order' => 'position',
            'fields' => [
                ['name' => 'project_category_id', 'label' => 'Category', 'type' => 'category'],
                ['name' => 'title', 'label' => 'Title', 'type' => 'text', 'required' => true],
                ['name' => 'slug', 'label' => 'Slug', 'type' => 'text', 'required' => true],
                ['name' => 'client', 'label' => 'Client', 'type' => 'text'],
                ['name' => 'role', 'label' => 'Role', 'type' => 'text'],
                ['name' => 'summary', 'label' => 'Summary', 'type' => 'textarea'],
                ['name' => 'body', 'label' => 'Body (plain text)', 'type' => 'textarea'],
                ['name' => 'cover_path', 'label' => 'Cover path', 'type' => 'text'],
                ['name' => 'gallery', 'label' => 'Gallery (JSON array)', 'type' => 'json'],
                ['name' => 'tech', 'label' => 'Technologies (JSON array)', 'type' => 'json'],
                ['name' => 'highlights', 'label' => 'Highlights (JSON array)', 'type' => 'json'],
                ['name' => 'live_url', 'label' => 'Live URL', 'type' => 'text'],
                ['name' => 'repo_url', 'label' => 'Repository URL', 'type' => 'text'],
                ['name' => 'completed_at', 'label' => 'Completed at', 'type' => 'date'],
                ['name' => 'status', 'label' => 'Status', 'type' => 'select', 'options' => ['published', 'draft', 'archived']],
                ['name' => 'is_featured', 'label' => 'Featured', 'type' => 'checkbox'],
                ['name' => 'position', 'label' => 'Position', 'type' => 'number'],
            ],
        ],
        'services' => [
            'title' => 'Services',
            'model' => Service::class,
            'order' => 'position',
            'fields' => [
                ['name' => 'title', 'label' => 'Title', 'type' => 'text', 'required' => true],
                ['name' => 'slug', 'label' => 'Slug', 'type' => 'text', 'required' => true],
                ['name' => 'icon', 'label' => 'Icon', 'type' => 'text'],
                ['name' => 'summary', 'label' => 'Summary', 'type' => 'textarea'],
                ['name' => 'body', 'label' => 'Body (plain text)', 'type' => 'textarea'],
                ['name' => 'features', 'label' => 'Features (JSON array)', 'type' => 'json'],
                ['name' => 'is_featured', 'label' => 'Featured', 'type' => 'checkbox'],
                ['name' => 'status', 'label' => 'Status', 'type' => 'select', 'options' => ['published', 'draft', 'archived']],
                ['name' => 'position', 'label' => 'Position', 'type' => 'number'],
            ],
        ],
        'skills' => [
            'title' => 'Skills',
            'model' => Skill::class,
            'order' => 'position',
            'fields' => [
                ['name' => 'name', 'label' => 'Name', 'type' => 'text', 'required' => true],
                ['name' => 'category', 'label' => 'Category', 'type' => 'text'],
                ['name' => 'level', 'label' => 'Level (0–255)', 'type' => 'number'],
                ['name' => 'icon', 'label' => 'Icon', 'type' => 'text'],
                ['name' => 'note', 'label' => 'Note', 'type' => 'text'],
                ['name' => 'is_featured', 'label' => 'Featured', 'type' => 'checkbox'],
                ['name' => 'enabled', 'label' => 'Enabled', 'type' => 'checkbox'],
                ['name' => 'position', 'label' => 'Position', 'type' => 'number'],
            ],
        ],
        'experiences' => [
            'title' => 'Experience',
            'model' => Exprience::class,
            'order' => 'position',
            'fields' => [
                ['name' => 'kind', 'label' => 'Kind', 'type' => 'select', 'options' => ['work', 'education', 'certification']],
                ['name' => 'role', 'label' => 'Role / qualification', 'type' => 'text', 'required' => true],
                ['name' => 'organization', 'label' => 'Organization', 'type' => 'text', 'required' => true],
                ['name' => 'location', 'label' => 'Location', 'type' => 'text'],
                ['name' => 'url', 'label' => 'URL', 'type' => 'text'],
                ['name' => 'summary', 'label' => 'Summary', 'type' => 'textarea'],
                ['name' => 'achievements', 'label' => 'Achievements (JSON array)', 'type' => 'json'],
                ['name' => 'start_date', 'label' => 'Start date', 'type' => 'date'],
                ['name' => 'end_date', 'label' => 'End date', 'type' => 'date'],
                ['name' => 'is_current', 'label' => 'Current', 'type' => 'checkbox'],
                ['name' => 'enabled', 'label' => 'Enabled', 'type' => 'checkbox'],
                ['name' => 'position', 'label' => 'Position', 'type' => 'number'],
            ],
        ],
        'clients' => [
            'title' => 'Clients',
            'model' => Client::class,
            'order' => 'position',
            'fields' => [
                ['name' => 'name', 'label' => 'Name', 'type' => 'text', 'required' => true],
                ['name' => 'logo_path', 'label' => 'Logo path', 'type' => 'text'],
                ['name' => 'url', 'label' => 'URL', 'type' => 'text'],
                ['name' => 'enabled', 'label' => 'Enabled', 'type' => 'checkbox'],
                ['name' => 'position', 'label' => 'Position', 'type' => 'number'],
            ],
        ],
        'testimonials' => [
            'title' => 'Testimonials',
            'model' => Testimonial::class,
            'order' => 'position',
            'fields' => [
                ['name' => 'name', 'label' => 'Name', 'type' => 'text', 'required' => true],
                ['name' => 'role', 'label' => 'Role', 'type' => 'text'],
                ['name' => 'company', 'label' => 'Company', 'type' => 'text'],
                ['name' => 'location', 'label' => 'Location', 'type' => 'text'],
                ['name' => 'avatar_path', 'label' => 'Avatar path', 'type' => 'text'],
                ['name' => 'quote', 'label' => 'Quote', 'type' => 'textarea', 'required' => true],
                ['name' => 'rating', 'label' => 'Rating (0–5)', 'type' => 'number'],
                ['name' => 'source_url', 'label' => 'Source URL', 'type' => 'text'],
                ['name' => 'is_featured', 'label' => 'Featured', 'type' => 'checkbox'],
                ['name' => 'enabled', 'label' => 'Enabled', 'type' => 'checkbox'],
                ['name' => 'position', 'label' => 'Position', 'type' => 'number'],
            ],
        ],
        'contacts' => [
            'title' => 'Messages',
            'model' => Contact::class,
            'order' => 'created_at',
            'fields' => [
                ['name' => 'status', 'label' => 'Status', 'type' => 'select', 'options' => ['new', 'read', 'replied', 'archived']],
            ],
        ],
    ];

    public function index(string $resource): Response
    {
        $definition = $this->definition($resource);
        $model = $definition['model'];
        $records = $model::query()
            ->orderBy(
                $definition['order'],
                $resource === 'contacts' ? 'desc' : 'asc',
            )
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('admin/ResourceIndex', [
            'resource' => $resource,
            'title' => $definition['title'],
            'fields' => $definition['fields'],
            'records' => $records,
            'canCreate' => $resource !== 'contacts',
            'categories' => $resource === 'projects'
                ? ProjectCategory::query()->orderBy('position')->get(['id', 'name'])
                : [],
        ]);
    }

    public function create(string $resource): Response
    {
        abort_if($resource === 'contacts', 404);

        return Inertia::render('admin/ResourceForm', $this->formProps($resource));
    }

    public function edit(string $resource, int $record): Response
    {
        $definition = $this->definition($resource);
        $model = $definition['model'];
        $item = $model::query()->findOrFail($record);

        return Inertia::render(
            'admin/ResourceForm',
            $this->formProps($resource, $item->toArray()),
        );
    }

    public function store(Request $request, string $resource): RedirectResponse
    {
        abort_if($resource === 'contacts', 404);

        $definition = $this->definition($resource);
        $model = $definition['model'];
        $validated = $request->validate($this->rules($resource));
        $model::query()->create($validated);

        return to_route('admin.resources.index', $resource)
            ->with('success', $definition['title'].' created.');
    }

    public function update(Request $request, string $resource, int $record): RedirectResponse
    {
        $definition = $this->definition($resource);
        $model = $definition['model'];
        $item = $model::query()->findOrFail($record);
        $validated = $request->validate($this->rules($resource, $item));

        if ($resource === 'contacts') {
            if (\in_array($validated['status'], ['read', 'replied'], true)) {
                $validated['read_at'] ??= $item->getAttribute('read_at') ?? now();
            }

            if ($validated['status'] === 'replied') {
                $validated['replied_at'] ??= $item->getAttribute('replied_at') ?? now();
            }
        }

        $item->update($validated);

        return to_route('admin.resources.index', $resource)
            ->with('success', $definition['title'].' updated.');
    }

    public function uploadSectionImage(Request $request, int $record): RedirectResponse
    {
        $section = Section::query()->findOrFail($record);
        abort_unless(\in_array($section->getAttribute('key'), ['hero', 'about'], true), 404);

        $request->validate([
            'image' => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
        ]);

        $image = $request->file('image');
        if ($image === null) {
            throw new \RuntimeException('The validated image upload is missing.');
        }

        $path = $image->store('sections', 'public');
        if ($path === false) {
            throw new \RuntimeException('The section image could not be stored.');
        }

        $config = $section->config ?? [];
        $config['image_path'] = asset('storage/'.$path);
        $section->config = $config;
        $section->save();

        return to_route('admin.resources.edit', ['sections', $section->getKey()])
            ->with('success', 'Section image uploaded.');
    }

    public function destroy(string $resource, int $record): RedirectResponse
    {
        $definition = $this->definition($resource);
        $model = $definition['model'];
        $item = $model::query()->findOrFail($record);
        $item->delete();

        return to_route('admin.resources.index', $resource)
            ->with('success', $definition['title'].' deleted.');
    }

    /**
     * @return array{title: string, model: class-string<Model>, order: string, fields: list<array<string, mixed>>}
     */
    private function definition(string $resource): array
    {
        abort_unless(isset(self::RESOURCES[$resource]), 404);

        return self::RESOURCES[$resource];
    }

    /**
     * @param  array<string, mixed>|null  $record
     * @return array<string, mixed>
     */
    private function formProps(string $resource, ?array $record = null): array
    {
        $definition = $this->definition($resource);

        return [
            'resource' => $resource,
            'title' => $definition['title'],
            'fields' => $definition['fields'],
            'record' => $record,
            'action' => $record
                ? route('admin.resources.update', [$resource, $record['id']])
                : route('admin.resources.store', $resource),
            'categories' => $resource === 'projects'
                ? ProjectCategory::query()->orderBy('position')->get(['id', 'name'])
                : [],
        ];
    }

    /**
     * @return array<string, array<int, mixed>>
     */
    private function rules(string $resource, ?Model $record = null): array
    {
        $unique = fn (string $table, string $column): Unique => tap(
            Rule::unique($table, $column),
            fn (Unique $rule) => $record && $rule->ignore($record->getKey()),
        );

        return match ($resource) {
            'sections' => [
                'key' => ['required', 'string', 'max:64', $unique('sections', 'key')],
                'name' => ['required', 'string', 'max:255'],
                'heading' => ['nullable', 'string', 'max:255'],
                'subheading' => ['nullable', 'string'],
                'enabled' => ['required', 'boolean'],
                'position' => ['required', 'integer', 'min:0'],
                'config' => ['nullable', 'array'],
            ],
            'project-categories' => [
                'name' => ['required', 'string', 'max:255'],
                'slug' => ['required', 'string', 'max:255', $unique('project_categories', 'slug')],
                'description' => ['nullable', 'string', 'max:255'],
                'position' => ['required', 'integer', 'min:0'],
            ],
            'projects' => [
                'project_category_id' => ['nullable', 'integer', 'exists:project_categories,id'],
                'title' => ['required', 'string', 'max:255'],
                'slug' => ['required', 'string', 'max:255', $unique('projects', 'slug')],
                'client' => ['nullable', 'string', 'max:255'],
                'role' => ['nullable', 'string', 'max:255'],
                'summary' => ['nullable', 'string'],
                'body' => ['nullable', 'string'],
                'cover_path' => ['nullable', 'string', 'max:255'],
                'gallery' => ['nullable', 'array'],
                'gallery.*' => ['string', 'max:255'],
                'tech' => ['nullable', 'array'],
                'tech.*' => ['string', 'max:255'],
                'highlights' => ['nullable', 'array'],
                'highlights.*' => ['string', 'max:255'],
                'live_url' => ['nullable', 'url:http,https', 'max:255'],
                'repo_url' => ['nullable', 'url:http,https', 'max:255'],
                'completed_at' => ['nullable', 'date'],
                'status' => ['required', 'string', 'max:16', Rule::in(['published', 'draft', 'archived'])],
                'is_featured' => ['required', 'boolean'],
                'position' => ['required', 'integer', 'min:0'],
            ],
            'services' => [
                'title' => ['required', 'string', 'max:255'],
                'slug' => ['required', 'string', 'max:255', $unique('services', 'slug')],
                'icon' => ['required', 'string', 'max:48'],
                'summary' => ['nullable', 'string'],
                'body' => ['nullable', 'string'],
                'features' => ['nullable', 'array'],
                'features.*' => ['string', 'max:255'],
                'is_featured' => ['required', 'boolean'],
                'status' => ['required', 'string', 'max:16', Rule::in(['published', 'draft', 'archived'])],
                'position' => ['required', 'integer', 'min:0'],
            ],
            'skills' => [
                'name' => ['required', 'string', 'max:255'],
                'category' => ['required', 'string', 'max:64'],
                'level' => ['required', 'integer', 'between:0,255'],
                'icon' => ['nullable', 'string', 'max:48'],
                'note' => ['nullable', 'string', 'max:255'],
                'is_featured' => ['required', 'boolean'],
                'enabled' => ['required', 'boolean'],
                'position' => ['required', 'integer', 'min:0'],
            ],
            'experiences' => [
                'kind' => ['required', 'string', 'max:24', Rule::in(['work', 'education', 'certification'])],
                'role' => ['required', 'string', 'max:255'],
                'organization' => ['required', 'string', 'max:255'],
                'location' => ['nullable', 'string', 'max:255'],
                'url' => ['nullable', 'url:http,https', 'max:255'],
                'summary' => ['nullable', 'string'],
                'achievements' => ['nullable', 'array'],
                'achievements.*' => ['string', 'max:255'],
                'start_date' => ['nullable', 'date'],
                'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],
                'is_current' => ['required', 'boolean'],
                'enabled' => ['required', 'boolean'],
                'position' => ['required', 'integer', 'min:0'],
            ],
            'clients' => [
                'name' => ['required', 'string', 'max:255'],
                'logo_path' => ['nullable', 'string', 'max:255'],
                'url' => ['nullable', 'url:http,https', 'max:255'],
                'enabled' => ['required', 'boolean'],
                'position' => ['required', 'integer', 'min:0'],
            ],
            'testimonials' => [
                'name' => ['required', 'string', 'max:255'],
                'role' => ['nullable', 'string', 'max:255'],
                'company' => ['nullable', 'string', 'max:255'],
                'location' => ['nullable', 'string', 'max:255'],
                'avatar_path' => ['nullable', 'string', 'max:255'],
                'quote' => ['required', 'string'],
                'rating' => ['required', 'integer', 'between:0,5'],
                'source_url' => ['nullable', 'url:http,https', 'max:255'],
                'is_featured' => ['required', 'boolean'],
                'enabled' => ['required', 'boolean'],
                'position' => ['required', 'integer', 'min:0'],
            ],
            'contacts' => [
                'status' => ['required', 'string', 'max:16', Rule::in(['new', 'read', 'replied', 'archived'])],
            ],
            default => abort(404),
        };
    }
}
