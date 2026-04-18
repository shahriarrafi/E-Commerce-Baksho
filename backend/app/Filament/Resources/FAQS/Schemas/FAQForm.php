<?php

namespace App\Filament\Resources\FAQS\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class FAQForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                \Filament\Schemas\Components\Section::make()
                    ->schema([
                        TextInput::make('question')
                            ->required(),
                        \Filament\Forms\Components\Select::make('category')
                            ->options([
                                'Shipping' => 'Shipping & Rituals',
                                'Orders' => 'Orders & Currency',
                                'Returns' => 'Returns & Completion',
                                'Brand' => 'Brand & Authenticity',
                            ])
                            ->required(),
                        Textarea::make('answer')
                            ->required()
                            ->rows(5)
                            ->columnSpanFull(),
                        \Filament\Schemas\Components\Grid::make(2)
                            ->schema([
                                TextInput::make('sort_order')
                                    ->required()
                                    ->numeric()
                                    ->default(0),
                                Toggle::make('is_active')
                                    ->default(true),
                            ]),
                    ]),
            ]);
    }
}
