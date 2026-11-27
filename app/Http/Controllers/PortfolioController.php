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
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioController extends Controller
{
    public function home(): Response
    {
        return Inertia::render('frontend/Home', [
            ...$this->sharedContent(),
            'projects' => Projects::query()
                ->with('category')
                ->where('status', 'published')
                ->where('is_featured', true)
                ->orderBy('position')
                ->get(),
            'services' => Service::query()
                ->where('status', 'published')
                ->where('is_featured', true)
                ->orderBy('position')
                ->get(),
        ]);
    }

    public function about(): Response
    {
        $content = $this->sharedContent();
        abort_unless($content['sections']->has('about'), 404);

        return Inertia::render('frontend/About', [
            ...$content,
        ]);
    }

    public function projects(Request $request): Response
    {
        $category = $request->string('category')->toString();
        $search = mb_substr($request->string('q')->toString(), 0, 100);

        $projects = Projects::query()
            ->with('category')
            ->where('status', 'published')
            ->when($search !== '', function ($query) use ($search) {
                $query->where(function ($searchQuery) use ($search) {
                    $searchQuery
                        ->where('title', 'like', "%{$search}%")
                        ->orWhere('summary', 'like', "%{$search}%")
                        ->orWhere('client', 'like', "%{$search}%");
                });
            })
            ->when(
                $category !== '',
                fn ($query) => $query->whereHas(
                    'category',
                    fn ($categoryQuery) => $categoryQuery->where('slug', $category),
                ),
            )
            ->orderBy('position')
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('frontend/projects/Index', [
            'projects' => $projects,
            'categories' => ProjectCategory::query()->orderBy('position')->get(),
            'selectedCategory' => $category,
            'search' => $search,
            'section' => Section::query()
                ->where('key', 'projects')
                ->where('enabled', true)
                ->first(),
        ]);
    }

    public function project(Request $request): Response
    {
        $slug = $request->string('slug')->toString();
        $project = Projects::query()
            ->with('category')
            ->where('status', 'published')
            ->where('slug', $slug)
            ->firstOrFail();

        return Inertia::render('frontend/projects/Show', [
            'project' => $project,
            'relatedProjects' => Projects::query()
                ->where('status', 'published')
                ->where('id', '!=', $project->getKey())
                ->orderByDesc('is_featured')
                ->orderBy('position')
                ->limit(3)
                ->get(),
        ]);
    }

    public function services(): Response
    {
        return Inertia::render('frontend/services/Index', [
            'services' => Service::query()
                ->where('status', 'published')
                ->orderBy('position')
                ->get(),
            'section' => Section::query()
                ->where('key', 'services')
                ->where('enabled', true)
                ->first(),
        ]);
    }

    public function service(Request $request): Response
    {
        $slug = $request->string('slug')->toString();
        $service = Service::query()
            ->where('status', 'published')
            ->where('slug', $slug)
            ->firstOrFail();

        return Inertia::render('frontend/services/Show', [
            'service' => $service,
            'others' => Service::query()
                ->where('status', 'published')
                ->where('id', '!=', $service->getKey())
                ->orderBy('position')
                ->get(),
        ]);
    }

    public function contact(): Response
    {
        return Inertia::render('frontend/Contact', [
            'section' => Section::query()
                ->where('key', 'contact')
                ->where('enabled', true)
                ->first(),
        ]);
    }

    public function storeContact(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:255'],
            'company' => ['nullable', 'string', 'max:255'],
            'subject' => ['nullable', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:10000'],
            'budget' => ['nullable', 'string', 'max:64'],
        ]);

        Contact::query()->create($validated);

        return back()->with('success', 'Thanks for your message. I will be in touch soon.');
    }

    /**
     * @return array<string, mixed>
     */
    private function sharedContent(): array
    {
        return [
            'sections' => Section::query()
                ->where('enabled', true)
                ->orderBy('position')
                ->get()
                ->keyBy('key'),
            'clients' => Client::query()
                ->where('enabled', true)
                ->orderBy('position')
                ->get(),
            'skills' => Skill::query()
                ->where('enabled', true)
                ->orderBy('position')
                ->get(),
            'experiences' => Exprience::query()
                ->where('enabled', true)
                ->orderBy('position')
                ->get(),
            'testimonials' => Testimonial::query()
                ->where('enabled', true)
                ->where('is_featured', true)
                ->orderBy('position')
                ->get(),
        ];
    }
}
