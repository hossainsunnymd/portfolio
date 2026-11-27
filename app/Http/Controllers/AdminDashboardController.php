<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Contact;
use App\Models\Exprience;
use App\Models\Projects;
use App\Models\Service;
use App\Models\Skill;
use App\Models\Testimonial;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('admin/Dashboard', [
            'stats' => [
                'projects' => Projects::query()->count(),
                'services' => Service::query()->count(),
                'skills' => Skill::query()->count(),
                'experiences' => Exprience::query()->count(),
                'clients' => Client::query()->count(),
                'testimonials' => Testimonial::query()->count(),
                'newContacts' => Contact::query()->where('status', 'new')->count(),
            ],
            'recentContacts' => Contact::query()
                ->latest()
                ->limit(5)
                ->get(['id', 'name', 'email', 'subject', 'status', 'created_at']),
        ]);
    }
}
