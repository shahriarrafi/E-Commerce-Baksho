<?php

namespace App\Filament\Resources\Orders\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class OrdersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('order_number')
                    ->searchable()
                    ->sortable()
                    ->label('Artifact ID')
                    ->copyable()
                    ->fontFamily('mono'),
                TextColumn::make('user.name')
                    ->label('Curator')
                    ->searchable()
                    ->sortable(),
                \Filament\Tables\Columns\SelectColumn::make('status')
                    ->options([
                        'ordered' => 'Manifested (Ordered)',
                        'processing' => 'Ritualizing (Processing)',
                        'shipped' => 'In Flight (Shipped)',
                        'delivered' => 'Received (Delivered)',
                        'cancelled' => 'Banished (Cancelled)',
                    ])
                    ->searchable(),
                TextColumn::make('total_amount')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('estimated_arrival')
                    ->dateTime()
                    ->sortable(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
