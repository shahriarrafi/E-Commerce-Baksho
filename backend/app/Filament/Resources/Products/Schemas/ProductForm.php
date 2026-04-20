<?php

namespace App\Filament\Resources\Products\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class ProductForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                \Filament\Schemas\Components\Tabs::make('Product Details')
                    ->tabs([
                        \Filament\Schemas\Components\Tabs\Tab::make('Identity & Content')
                            ->icon('heroicon-m-identification')
                            ->schema([
                                \Filament\Schemas\Components\Section::make('General Information')
                                    ->description('Manage the primary identity and description of this manifestation.')
                                    ->schema([
                                        \Filament\Schemas\Components\Grid::make(2)
                                            ->schema([
                                                \Filament\Forms\Components\TextInput::make('name')
                                                    ->label('Product Name')
                                                    ->placeholder('e.g. Signature Hexagonal Box')
                                                    ->required()
                                                    ->live(onBlur: true)
                                                    ->afterStateUpdated(fn ($state, \Filament\Schemas\Components\Utilities\Set $set) => $set('slug', \Illuminate\Support\Str::slug($state))),
                                                \Filament\Forms\Components\TextInput::make('slug')
                                                    ->label('URL Slug')
                                                    ->helperText('Automatically generated from name')
                                                    ->disabled()
                                                    ->dehydrated()
                                                    ->required()
                                                    ->unique(\App\Models\Product::class, 'slug', ignoreRecord: true),
                                            ]),
                                        \Filament\Forms\Components\RichEditor::make('description')
                                            ->label('Product Story')
                                            ->placeholder('Describe the artistic manifestation of this piece...')
                                            ->columnSpanFull(),
                                    ]),
                            ]),

                        \Filament\Schemas\Components\Tabs\Tab::make('Inventory & Categories')
                            ->icon('heroicon-m-cube')
                            ->schema([
                                \Filament\Schemas\Components\Grid::make(2)
                                    ->schema([
                                        \Filament\Schemas\Components\Section::make('Pricing & Stock')
                                            ->schema([
                                                \Filament\Forms\Components\TextInput::make('price')
                                                    ->numeric()
                                                    ->required()
                                                    ->prefix('$')
                                                    ->extraInputAttributes(['step' => '0.01']),
                                                \Filament\Forms\Components\TextInput::make('stock_quantity')
                                                    ->label('Available Inventory')
                                                    ->numeric()
                                                    ->default(0)
                                                    ->required()
                                                    ->helperText('Actual physical units in the sanctuary.'),
                                            ])->columnSpan(1),

                                        \Filament\Schemas\Components\Section::make('Discovery')
                                            ->schema([
                                                \Filament\Forms\Components\CheckboxList::make('categories')
                                                    ->label('Assigned Categories')
                                                    ->relationship('categories', 'name')
                                                    ->columns(2)
                                                    ->gridDirection('vertical')
                                                    ->required(),
                                                \Filament\Forms\Components\Toggle::make('is_active')
                                                    ->label('Visible on Storefront')
                                                    ->helperText('Toggle visibility in discovery portals.')
                                                    ->default(true),
                                            ])->columnSpan(1),
                                    ]),
                                \Filament\Forms\Components\Textarea::make('shipping_info')
                                    ->label('Shipping Rituals')
                                    ->placeholder('Default delivery within 24-48 hours...')
                                    ->rows(3),
                            ]),

                        \Filament\Schemas\Components\Tabs\Tab::make('Visual Artifacts')
                            ->icon('heroicon-m-photo')
                            ->schema([
                                \Filament\Forms\Components\SpatieMediaLibraryFileUpload::make('images')
                                    ->label('Gallery Manifestations')
                                    ->multiple()
                                    ->collection('products')
                                    ->reorderable()
                                    ->imageEditor()
                                    ->panelLayout('grid')
                                    ->columnSpanFull(),
                            ]),

                        \Filament\Schemas\Components\Tabs\Tab::make('Specifications')
                            ->icon('heroicon-m-list-bullet')
                            ->schema([
                                \Filament\Forms\Components\Repeater::make('specifications')
                                    ->relationship()
                                    ->schema([
                                        \Filament\Forms\Components\TextInput::make('label')
                                            ->placeholder('e.g., Material')
                                            ->required(),
                                        \Filament\Forms\Components\TextInput::make('value')
                                            ->placeholder('e.g., Premium Oak')
                                            ->required(),
                                    ])
                                    ->columns(2)
                                    ->itemLabel(fn (array $state): ?string => $state['label'] ?? null),
                            ]),

                        \Filament\Schemas\Components\Tabs\Tab::make('Variants')
                            ->icon('heroicon-m-swatch')
                            ->schema([
                                \Filament\Forms\Components\Repeater::make('variants')
                                    ->relationship()
                                    ->schema([
                                        \Filament\Forms\Components\TextInput::make('type')
                                            ->placeholder('e.g., Color')
                                            ->required(),
                                        \Filament\Forms\Components\TextInput::make('name')
                                            ->placeholder('e.g., Royal Blue')
                                            ->required(),
                                        \Filament\Forms\Components\TextInput::make('price_adjustment')
                                            ->label('Price Offset')
                                            ->numeric()
                                            ->default(0)
                                            ->prefix('+'),
                                    ])
                                    ->columns(3)
                                    ->itemLabel(fn (array $state): ?string => $state['name'] ?? null),
                            ]),
                    ])
                    ->columnSpanFull(),
            ]);
    }
}
