<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\Exprience;
use App\Models\ProjectCategory;
use App\Models\Projects;
use App\Models\Service;
use App\Models\Skill;
use Illuminate\Database\Seeder;

class PortfolioSeeder extends Seeder
{
    public function run(): void
    {
        $categoryIds = [];

        foreach ([
            [
                'name' => 'E-commerce',
                'slug' => 'ecommerce',
                'description' => 'Online shops and commerce platforms.',
                'position' => 1,
            ],
            [
                'name' => 'Business Applications',
                'slug' => 'business-applications',
                'description' => 'Custom systems for business operations.',
                'position' => 2,
            ],
            [
                'name' => 'Inventory Management',
                'slug' => 'inventory-management',
                'description' => 'Inventory and stock management systems.',
                'position' => 3,
            ],
        ] as $category) {
            $record = ProjectCategory::updateOrCreate(
                ['slug' => $category['slug']],
                $category,
            );
            $categoryIds[$category['slug']] = $record->id;
        }

        foreach ([
            [
                'title' => 'Ideal Fibre Inventory Management System',
                'slug' => 'ideal-fibre-inventory-management',
                'project_category_id' => $categoryIds['inventory-management'],
                'client' => 'Ideal Fibre',
                'role' => 'Full Stack Developer',
                'summary' => 'A Laravel inventory application for raw materials, purchasing, production requisitions, stock approvals, and reporting.',
                'body' => "The Challenge\n\nStock was tracked across spreadsheets, making current levels and inventory movements difficult to audit.\n\nWhat I Built\n\nA Laravel application connecting purchases, inventory, production requisitions, approvals, and stock movement records.\n\nResult\n\nInventory questions and reconciliation became easier to answer from a single system.",
                'cover_path' => null,
                'gallery' => [],
                'tech' => ['Laravel', 'PHP', 'MySQL', 'JavaScript'],
                'highlights' => [
                    'Raw material inventory tracking',
                    'Vendor and purchase management',
                    'Production floor requisitions',
                    'Supervisor approval workflow',
                    'Stock movement logs',
                    'Inventory reporting and reconciliation',
                ],
                'live_url' => null,
                'repo_url' => null,
                'completed_at' => null,
                'status' => 'published',
                'is_featured' => true,
                'position' => 1,
            ],
            [
                'title' => 'E-commerce Website',
                'slug' => 'ecommerce-website',
                'project_category_id' => $categoryIds['ecommerce'],
                'client' => null,
                'role' => null,
                'summary' => 'An online shopping platform with product management, cart, and secure checkout.',
                'body' => null,
                'cover_path' => null,
                'gallery' => [],
                'tech' => ['Laravel', 'Vue.js', 'MySQL'],
                'highlights' => [],
                'live_url' => null,
                'repo_url' => null,
                'completed_at' => null,
                'status' => 'published',
                'is_featured' => true,
                'position' => 2,
            ],
            [
                'title' => 'POS Management System',
                'slug' => 'pos-management-system',
                'project_category_id' => $categoryIds['business-applications'],
                'client' => null,
                'role' => null,
                'summary' => 'A point-of-sale solution for products, sales, inventory, and invoices.',
                'body' => null,
                'cover_path' => null,
                'gallery' => [],
                'tech' => ['Laravel', 'Inertia.js', 'Tailwind CSS'],
                'highlights' => [],
                'live_url' => null,
                'repo_url' => null,
                'completed_at' => null,
                'status' => 'published',
                'is_featured' => true,
                'position' => 3,
            ],
        ] as $project) {
            Projects::updateOrCreate(
                ['slug' => $project['slug']],
                $project,
            );
        }

        foreach ([
            [
                'title' => 'Web Development',
                'slug' => 'web-development',
                'icon' => 'monitor',
                'summary' => 'Modern, responsive, high-performance websites built for your business.',
                'features' => ['Responsive website design', 'SEO-friendly structure', 'Fast loading performance'],
            ],
            [
                'title' => 'Laravel Development',
                'slug' => 'laravel-development',
                'icon' => 'code',
                'summary' => 'Scalable backend applications, REST APIs, and custom business solutions.',
                'features' => ['Custom Laravel applications', 'REST API development', 'Authentication and authorization'],
            ],
            [
                'title' => 'Frontend Development',
                'slug' => 'frontend-development',
                'icon' => 'sparkles',
                'summary' => 'Interactive user interfaces built with modern frontend frameworks.',
                'features' => ['Responsive user interfaces', 'React and Vue.js', 'Tailwind CSS'],
            ],
            [
                'title' => 'E-commerce Development',
                'slug' => 'ecommerce-development',
                'icon' => 'shopping-cart',
                'summary' => 'Online shopping solutions with inventory, orders, and payment integration.',
                'features' => ['Product and inventory management', 'Shopping cart and checkout', 'Payment gateway integration'],
            ],
            [
                'title' => 'API Integration',
                'slug' => 'api-integration',
                'icon' => 'settings',
                'summary' => 'Third-party API integrations, payment gateways, and backend connections.',
                'features' => ['Third-party API integration', 'Payment gateway integration', 'Backend connections'],
            ],
            [
                'title' => 'Website Maintenance',
                'slug' => 'website-maintenance',
                'icon' => 'clock',
                'summary' => 'Ongoing updates, bug fixes, and performance improvements for your website.',
                'features' => ['Regular updates', 'Bug fixes', 'Performance improvements'],
            ],
        ] as $position => $service) {
            Service::updateOrCreate(
                ['slug' => $service['slug']],
                [
                    ...$service,
                    'body' => null,
                    'is_featured' => true,
                    'status' => 'published',
                    'position' => $position + 1,
                ],
            );
        }

        $skills = [
            ['PHP', 'Backend Development', 90],
            ['Laravel', 'Backend Development', 90],
            ['REST API', 'Backend Development', 85],
            ['Vue.js', 'Frontend Development', 85],
            ['React.js', 'Frontend Development', 75],
            ['Tailwind CSS', 'Frontend Development', 90],
            ['MySQL', 'Database & Tools', 85],
            ['Git & GitHub', 'Database & Tools', 80],
            ['Postman', 'Database & Tools', 85],
        ];

        foreach ($skills as $position => [$name, $category, $level]) {
            Skill::updateOrCreate(
                ['name' => $name, 'category' => $category],
                [
                    'level' => $level,
                    'icon' => null,
                    'note' => null,
                    'is_featured' => true,
                    'enabled' => true,
                    'position' => $position + 1,
                ],
            );
        }

        foreach ([
            [
                'kind' => 'work',
                'role' => 'Full Stack Web Developer',
                'organization' => 'ABC Technologies',
                'location' => 'Dhaka, Bangladesh',
                'summary' => 'Developing web applications using Laravel, Vue.js, MySQL, and modern frontend technologies.',
                'achievements' => ['Developed REST APIs and backend systems.', 'Built responsive admin dashboards.', 'Managed database design and optimization.'],
                'start_date' => '2024-01-01',
                'end_date' => null,
                'is_current' => true,
                'position' => 1,
            ],
            [
                'kind' => 'work',
                'role' => 'Junior Web Developer',
                'organization' => 'XYZ Software',
                'location' => 'Dhaka, Bangladesh',
                'summary' => 'Worked on frontend development, backend integration, and database management.',
                'achievements' => ['Developed user-friendly interfaces.', 'Integrated third-party APIs.'],
                'start_date' => '2022-01-01',
                'end_date' => '2024-01-01',
                'is_current' => false,
                'position' => 2,
            ],
            [
                'kind' => 'education',
                'role' => 'Bachelor Degree',
                'organization' => 'University Name',
                'location' => null,
                'summary' => 'Completed academic studies and developed foundational knowledge.',
                'achievements' => [],
                'start_date' => '2020-01-01',
                'end_date' => '2024-01-01',
                'is_current' => false,
                'position' => 1,
            ],
            [
                'kind' => 'certification',
                'role' => 'Web Development Training',
                'organization' => 'Training Institute',
                'location' => null,
                'summary' => 'Learned modern web development technologies.',
                'achievements' => [],
                'start_date' => '2023-01-01',
                'end_date' => '2023-12-31',
                'is_current' => false,
                'position' => 1,
            ],
        ] as $experience) {
            Exprience::updateOrCreate(
                [
                    'kind' => $experience['kind'],
                    'role' => $experience['role'],
                    'organization' => $experience['organization'],
                ],
                [
                    ...$experience,
                    'url' => null,
                    'enabled' => true,
                ],
            );
        }

        foreach (['Company One', 'Company Two', 'Company Three', 'Company Four'] as $position => $name) {
            Client::updateOrCreate(
                ['name' => $name],
                [
                    'logo_path' => null,
                    'url' => null,
                    'enabled' => true,
                    'position' => $position + 1,
                ],
            );
        }
    }
}
