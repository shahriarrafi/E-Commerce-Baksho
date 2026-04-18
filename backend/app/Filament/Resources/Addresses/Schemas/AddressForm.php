<?php

namespace App\Filament\Resources\Addresses\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class AddressForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                \Filament\Schemas\Components\Section::make('Identity & Contact')
                    ->schema([
                        \Filament\Schemas\Components\Grid::make(2)
                            ->schema([
                                \Filament\Forms\Components\Select::make('user_id')
                                    ->relationship('user', 'name')
                                    ->searchable()
                                    ->placeholder('Guest Checkout (Optional)'),
                                TextInput::make('label')
                                    ->placeholder('e.g. Home, Vault 01'),
                            ]),
                        TextInput::make('phone')
                            ->tel()
                            ->required(),
                    ]),
                \Filament\Schemas\Components\Section::make('Delivery Ritual')
                    ->schema([
                        Textarea::make('address')
                            ->required()
                            ->rows(3),
                        Toggle::make('is_default')
                            ->label('Set as Default Vault'),
                    ]),
            ]);
    }
}
