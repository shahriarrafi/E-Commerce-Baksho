<?php

namespace App\Filament\Resources\Categories\Schemas;

use Filament\Schemas\Schema;

class CategoryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                \Filament\Schemas\Components\Section::make()
                    ->schema([
                        \Filament\Forms\Components\TextInput::make('name')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn ($state, \Filament\Schemas\Components\Utilities\Set $set) => $set('slug', \Illuminate\Support\Str::slug($state))),

                        \Filament\Forms\Components\TextInput::make('slug')
                            ->required()
                            ->maxLength(255)
                            ->unique(\App\Models\Category::class, 'slug', ignoreRecord: true),

                        \Filament\Forms\Components\Select::make('parent_id')
                            ->label('Parent Category')
                            ->relationship('parent', 'name')
                            ->placeholder('Select Parent Category (Optional)')
                            ->searchable(),

                        \Filament\Forms\Components\FileUpload::make('icon')
                            ->image()
                            ->directory('categories'),

                        \Filament\Forms\Components\Toggle::make('is_active')
                            ->default(true),
                    ])
            ]);
    }
}
