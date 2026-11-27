<?php

namespace Database\Seeders;

use App\Models\Section;
use Illuminate\Database\Seeder;

class SectionSeeder extends Seeder
{
    public function run(): void
    {
        $sections = [
            [
                'key' => 'hero',
                'name' => 'Hero',
                'heading' => 'I build web applications that are fast, maintainable and genuinely easy to run.',
                'subheading' => 'Full-stack developer in Dhaka with 10+ years across Laravel, Vue.js and WordPress. I take projects from first sketch to a deployed product you can manage yourself.',
                'config' => [
                    'eyebrow' => 'Full-stack developer · Dhaka, Bangladesh',
                    'image_shape' => 'rounded',
                    'primary_cta_label' => 'Start a project',
                    'primary_cta_url' => '/contact',
                    'secondary_cta_label' => 'View my work',
                    'secondary_cta_url' => '/projects',
                    'show_stats' => true,
                    'stats' => [
                        ['value' => '10+', 'label' => 'Years building for the web'],
                        ['value' => '60+', 'label' => 'Projects delivered'],
                        ['value' => '4', 'label' => 'Continents worked with'],
                    ],
                    'show_tech' => true,

                    'tech' => [
                        ['label' => 'Laravel', 'icon' => '🔺', 'color' => '#ff2d20'],
                        ['label' => 'Vue 3', 'icon' => '💚', 'color' => '#42b883'],
                        ['label' => 'Inertia.js', 'icon' => '🧭', 'color' => '#9553e9'],
                        ['label' => 'Tailwind CSS', 'icon' => '💨', 'color' => '#38bdf8'],
                        ['label' => 'MySQL', 'icon' => '🐬', 'color' => '#4479a1'],
                        ['label' => 'PHP', 'icon' => '🐘', 'color' => '#777bb4'],
                        ['label' => 'WordPress', 'icon' => '📝', 'color' => '#21759b'],
                        ['label' => 'REST APIs', 'icon' => '🔌', 'color' => '#0ea5e9'],
                        ['label' => 'Vite', 'icon' => '⚡', 'color' => '#646cff'],
                        ['label' => 'Git', 'icon' => '🌿', 'color' => '#f05032'],
                    ],
                ],
            ],
            [
                'key' => 'clients',
                'name' => 'Client logos',
                'heading' => "Teams I've built and shipped for.",
                'subheading' => null,
            ],
            [
                'key' => 'about',
                'name' => 'About',
                'heading' => 'A developer who started in support, so I build things people can actually operate.',
                'subheading' => null,
                'config' => [
                    'eyebrow' => 'About me',
                    'body' => "I am Shifkat, a full-stack developer based in Dhaka, Bangladesh. I spent my first years on the other side of the software — doing administrative and support work inside small businesses — and it shaped how I build now. I saw how often good software failed simply because nobody on the team could change a price, publish a post, or fix a typo without calling a developer.\n\nSo I build the admin panel with the same care as the public site. Every project I hand over comes with a dashboard the client's own team can run: content they control, settings they understand, and no mystery boxes.\n\nThese days most of my work is Laravel on the back end with Vue 3 and Inertia on the front, styled with Tailwind. I still take on WordPress and WooCommerce work, and I am comfortable owning the whole path from database schema to deployment.",
                    'cta_label' => 'Read more about me',
                    'cta_url' => '/about',
                    'show_facts' => true,
                    'facts' => [
                        ['label' => 'Based in', 'value' => 'Dhaka, Bangladesh (UTC+6)'],
                        ['label' => 'Focus', 'value' => 'Laravel · Vue 3 · Inertia'],
                        ['label' => 'Also fluent in', 'value' => 'WordPress · WooCommerce'],
                        ['label' => 'Working style', 'value' => 'Async-friendly, clear weekly updates'],
                    ],
                ],
            ],
            [
                'key' => 'services',
                'name' => 'Services',
                'heading' => 'Services',
                'subheading' => 'Whether you need a product built from scratch or an existing site rescued, these are the engagements I take on most often.',
                'config' => ['eyebrow' => 'What I do'],
            ],
            [
                'key' => 'projects',
                'name' => 'Featured projects',
                'heading' => 'Recent projects',
                'subheading' => 'A sample of the applications and sites I have designed, built and shipped.',
                'config' => ['eyebrow' => 'Selected work'],
            ],
            [
                'key' => 'skills',
                'name' => 'Skills & tools',
                'heading' => 'Technologies I work with',
                'subheading' => 'Grouped by where they sit in the stack — not a list of everything I have ever touched.',
                'config' => ['eyebrow' => 'Toolkit'],
            ],
            [
                'key' => 'experience',
                'name' => 'Experience',
                'heading' => 'Where I have worked',
                'subheading' => null,
                'config' => [
                    'eyebrow' => 'Background',
                    'show_education' => true,
                ],
            ],
            [
                'key' => 'testimonials',
                'name' => 'Testimonials',
                'heading' => 'What clients say',
                'subheading' => null,
                'enabled' => false,
                'config' => ['eyebrow' => 'Kind words'],
            ],
            [
                'key' => 'cta',
                'name' => 'Closing call to action',
                'heading' => 'Have a project in mind?',
                'subheading' => 'Tell me what you are building. I reply to every message within one business day.',
                'config' => [
                    'primary_cta_label' => 'Get in touch',
                    'primary_cta_url' => '/contact',
                    'secondary_cta_label' => 'See projects',
                    'secondary_cta_url' => '/projects',
                ],
            ],
            [
                'key' => 'contact',
                'name' => 'Contact',
                'heading' => 'Tell me about your project',
                'subheading' => 'Share a few details and I will reply within one business day.',
                'config' => [
                    'eyebrow' => 'Get in touch',
                    'process_steps' => [
                        'Review your message and project requirements.',
                        'Follow up to clarify scope, goals, and timing.',
                        'Agree on next steps and a project estimate.',
                    ],
                ],
            ],
        ];

        foreach ($sections as $position => $section) {
            $section['position'] = $position;
            Section::updateOrCreate(['key' => $section['key']], $section);
        }
    }
}
