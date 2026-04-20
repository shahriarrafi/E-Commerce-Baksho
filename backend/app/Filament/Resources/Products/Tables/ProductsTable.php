<?php

namespace App\Filament\Resources\Products\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class ProductsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                \Filament\Tables\Columns\SpatieMediaLibraryImageColumn::make('images')
                    ->collection('products')
                    ->limit(1)
                    ->circular(),
                TextColumn::make('name')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('price')
                    ->label('Investment')
                    ->money('USD')
                    ->color('success')
                    ->weight('bold')
                    ->sortable(),
                TextColumn::make('stock_quantity')
                    ->label('Sanctuary Stock')
                    ->badge()
                    ->color(fn (int $state): string => match (true) {
                        $state <= 0 => 'danger',
                        $state <= 5 => 'warning',
                        default => 'success',
                    })
                    ->description(fn (int $state): string => match (true) {
                        $state <= 0 => 'Out of Stock',
                        $state <= 5 => 'Low Inventory',
                        default => 'Available',
                    })
                    ->sortable(),
                TextColumn::make('categories.name')
                    ->label('Assigned Portal')
                    ->searchable()
                    ->sortable()
                    ->badge()
                    ->color('info'),
                \Filament\Tables\Columns\ToggleColumn::make('is_active')
                    ->label('Storefront Visibility'),
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
