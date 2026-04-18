<?php

namespace App\Filament\Resources\Orders\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class OrderForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                \Filament\Schemas\Components\Section::make('Ritual Manifestation')
                    ->description('Universal order identity and status track.')
                    ->schema([
                        \Filament\Schemas\Components\Grid::make(2)
                            ->schema([
                                TextInput::make('order_number')
                                    ->disabled()
                                    ->required(),
                                \Filament\Forms\Components\Select::make('status')
                                    ->options([
                                        'ordered' => 'Manifested (Ordered)',
                                        'processing' => 'Ritualizing (Processing)',
                                        'shipped' => 'In Flight (Shipped)',
                                        'delivered' => 'Received (Delivered)',
                                        'cancelled' => 'Banished (Cancelled)',
                                    ])
                                    ->required(),
                            ]),
                        \Filament\Schemas\Components\Grid::make(2)
                            ->schema([
                                \Filament\Forms\Components\Select::make('user_id')
                                    ->relationship('user', 'name')
                                    ->disabled(),
                                TextInput::make('total_amount')
                                    ->numeric()
                                    ->disabled()
                                    ->prefix('$'),
                            ]),
                        DateTimePicker::make('estimated_arrival')
                            ->label('Arrival Estimation'),
                    ]),
                \Filament\Schemas\Components\Section::make('Destination (The Vault)')
                    ->description('Curator and shipping destination details.')
                    ->schema([
                        \Filament\Schemas\Components\Grid::make(2)
                            ->schema([
                                TextInput::make('customer_name')
                                    ->label('Recipient Name')
                                    ->disabled(),
                                TextInput::make('customer_email')
                                    ->label('Recipient Email')
                                    ->disabled(),
                            ]),
                        TextInput::make('phone')
                            ->label('Phone Ritual')
                            ->disabled(),
                        \Filament\Forms\Components\Textarea::make('shipping_address')
                            ->label('Shipping Destination')
                            ->disabled()
                            ->columnSpanFull(),
                    ]),
                \Filament\Schemas\Components\Section::make('Treasures Included')
                    ->schema([
                        \Filament\Forms\Components\Repeater::make('items')
                            ->relationship()
                            ->schema([
                                \Filament\Forms\Components\Select::make('product_id')
                                    ->relationship('product', 'name')
                                    ->disabled(),
                                \Filament\Forms\Components\Select::make('product_variant_id')
                                    ->relationship('variant', 'name')
                                    ->label('Variant')
                                    ->disabled(),
                                TextInput::make('quantity')
                                    ->numeric()
                                    ->disabled(),
                                TextInput::make('price')
                                    ->numeric()
                                    ->prefix('$')
                                    ->disabled(),
                            ])
                            ->columns(4)
                            ->disabled()
                            ->addable(false)
                            ->deletable(false),
                    ]),
            ]);
    }
}
