<?php

namespace App\Filament\Resources\Categories\Schemas;

use Filament\Schemas\Schema;

class CategoryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                \Filament\Schemas\Components\Section::make('Category Identity')
                    ->description('Organize your product portals with clear names and parent hierarchies.')
                    ->schema([
                        \Filament\Schemas\Components\Grid::make(2)
                            ->schema([
                                \Filament\Forms\Components\TextInput::make('name')
                                    ->label('Category Name')
                                    ->placeholder('e.g. Premium Boxes')
                                    ->required()
                                    ->maxLength(255)
                                    ->live(onBlur: true)
                                    ->afterStateUpdated(fn ($state, \Filament\Schemas\Components\Utilities\Set $set) => $set('slug', \Illuminate\Support\Str::slug($state))),

                                \Filament\Forms\Components\TextInput::make('slug')
                                    ->label('Portal Slug')
                                    ->required()
                                    ->disabled()
                                    ->dehydrated()
                                    ->maxLength(255)
                                    ->unique(\App\Models\Category::class, 'slug', ignoreRecord: true),
                            ]),

                        \Filament\Schemas\Components\Grid::make(3)
                            ->schema([
                                \Filament\Forms\Components\Select::make('parent_id')
                                    ->label('Parent Portal')
                                    ->relationship('parent', 'name')
                                    ->placeholder('Top-level Portal')
                                    ->searchable()
                                    ->preload()
                                    ->columnSpan(2),

                                \Filament\Forms\Components\Toggle::make('is_active')
                                    ->label('Active Status')
                                    ->inline(false)
                                    ->default(true)
                                    ->columnSpan(1),
                            ]),
                        
                        \Filament\Forms\Components\FileUpload::make('icon')
                            ->label('Portal Icon/Banner')
                            ->image()
                            ->directory('categories')
                            ->imageEditor()
                            ->columnSpanFull(),
                    ])
            ]);
    }
}
