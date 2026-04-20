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
                \Filament\Schemas\Components\Tabs::make('Tabs')
                    ->tabs([
                        \Filament\Schemas\Components\Tabs\Tab::make('Basic Info')
                            ->schema([
                                \Filament\Schemas\Components\Grid::make(2)
                                    ->schema([
                                        \Filament\Forms\Components\TextInput::make('name')
                                            ->required()
                                            ->live(onBlur: true)
                                            ->afterStateUpdated(fn ($state, \Filament\Schemas\Components\Utilities\Set $set) => $set('slug', \Illuminate\Support\Str::slug($state))),
                                        \Filament\Forms\Components\TextInput::make('slug')
                                            ->disabled()
                                            ->dehydrated()
                                            ->required()
                                            ->unique(\App\Models\Product::class, 'slug', ignoreRecord: true),
                                    ]),
                                \Filament\Forms\Components\RichEditor::make('description')
                                    ->columnSpanFull(),
                                \Filament\Schemas\Components\Grid::make(3)
                                    ->schema([
                                        \Filament\Forms\Components\TextInput::make('price')
                                            ->numeric()
                                            ->required()
                                            ->prefix('$'),
                                        \Filament\Forms\Components\TextInput::make('stock_quantity')
                                            ->numeric()
                                            ->default(0)
                                            ->required(),
                                        \Filament\Forms\Components\CheckboxList::make('categories')
                                            ->relationship('categories', 'name')
                                            ->columns(2)
                                            ->gridDirection('vertical')
                                            ->required(),
                                    ]),
                                \Filament\Forms\Components\Textarea::make('shipping_info')
                                    ->rows(3),
                                \Filament\Forms\Components\Toggle::make('is_active')
                                    ->default(true),
                            ]),
                        \Filament\Schemas\Components\Tabs\Tab::make('Media')
                            ->schema([
                                \Filament\Forms\Components\SpatieMediaLibraryFileUpload::make('images')
                                    ->multiple()
                                    ->collection('products')
                                    ->reorderable(),
                            ]),
                        \Filament\Schemas\Components\Tabs\Tab::make('Variants')
                            ->schema([
                                \Filament\Forms\Components\Repeater::make('variants')
                                    ->relationship()
                                    ->schema([
                                        \Filament\Forms\Components\TextInput::make('type')
                                            ->placeholder('e.g., Color, Size')
                                            ->required(),
                                        \Filament\Forms\Components\TextInput::make('name')
                                            ->placeholder('e.g., XL, Matte Black')
                                            ->required(),
                                        \Filament\Forms\Components\TextInput::make('price_adjustment')
                                            ->numeric()
                                            ->default(0)
                                            ->prefix('+'),
                                    ])
                                    ->columns(3),
                            ]),
                        \Filament\Schemas\Components\Tabs\Tab::make('Specifications')
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
                                    ->columns(2),
                            ]),
                    ])
                    ->columnSpanFull(),
            ]);
    }
}
