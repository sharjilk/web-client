'use client';
import {
  Coffee,
  CreditCard,
  HomeIcon,
  Plane,
  ShoppingBag,
  Utensils,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

const categories = [
  {
    name: 'Shopping',
    amount: 450.75,
    percentage: 28,
    icon: <ShoppingBag className='h-4 w-4' />,
    color:
      'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400',
  },
  {
    name: 'Food & Dining',
    amount: 385.2,
    percentage: 24,
    icon: <Utensils className='h-4 w-4' />,
    color:
      'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400',
  },
  {
    name: 'Coffee Shops',
    amount: 94.5,
    percentage: 6,
    icon: <Coffee className='h-4 w-4' />,
    color: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
  },
  {
    name: 'Travel',
    amount: 320.0,
    percentage: 20,
    icon: <Plane className='h-4 w-4' />,
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400',
  },
  {
    name: 'Housing',
    amount: 210.3,
    percentage: 13,
    icon: <HomeIcon className='h-4 w-4' />,
    color: 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400',
  },
  {
    name: 'Bills',
    amount: 145.25,
    percentage: 9,
    icon: <CreditCard className='h-4 w-4' />,
    color: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400',
  },
];

export function SpendingChart() {
  return (
    <div className='space-y-4'>
      <div className='grid gap-4 md:grid-cols-2'>
        <div className='flex items-center justify-center'>
          <div className='relative h-40 w-40'>
            <svg className='h-full w-full' viewBox='0 0 100 100'>
              <circle
                className='fill-none stroke-muted-foreground/20'
                cx='50'
                cy='50'
                r='40'
                strokeWidth='20'
              />
              {categories.map((category, index) => {
                // Calculate the segment's start position
                const previousPercentages = categories
                  .slice(0, index)
                  .reduce((sum, cat) => sum + cat.percentage, 0);

                const startAngle = (previousPercentages / 100) * 360 - 90;
                const endAngle =
                  ((previousPercentages + category.percentage) / 100) * 360 -
                  90;

                // Convert angles to radians
                const startRad = (startAngle * Math.PI) / 180;
                const endRad = (endAngle * Math.PI) / 180;

                // Calculate the SVG arc path
                const x1 = 50 + 40 * Math.cos(startRad);
                const y1 = 50 + 40 * Math.sin(startRad);
                const x2 = 50 + 40 * Math.cos(endRad);
                const y2 = 50 + 40 * Math.sin(endRad);

                // Determine if the arc should be drawn the long way around
                const largeArcFlag = category.percentage > 50 ? 1 : 0;

                // Create the SVG path
                const path = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

                // Extract color from the category
                const colorClass = category.color.split(' ')[0];
                let fillColor;

                // Map Tailwind color classes to actual colors
                switch (colorClass) {
                  case 'bg-purple-100':
                    fillColor = 'rgb(243, 232, 255)';
                    break;
                  case 'bg-orange-100':
                    fillColor = 'rgb(255, 237, 213)';
                    break;
                  case 'bg-amber-100':
                    fillColor = 'rgb(254, 243, 199)';
                    break;
                  case 'bg-blue-100':
                    fillColor = 'rgb(219, 234, 254)';
                    break;
                  case 'bg-green-100':
                    fillColor = 'rgb(220, 252, 231)';
                    break;
                  case 'bg-red-100':
                    fillColor = 'rgb(254, 226, 226)';
                    break;
                  default:
                    fillColor = 'rgb(229, 231, 235)';
                }

                return (
                  <path
                    key={category.name}
                    d={path}
                    fill={fillColor}
                    className='dark:opacity-80'
                  />
                );
              })}
            </svg>
          </div>
        </div>
        <div>
          <ScrollArea className='h-[200px] pr-4'>
            <div className='space-y-4'>
              {categories.map((category) => (
                <div
                  key={category.name}
                  className='flex items-center justify-between'
                >
                  <div className='flex items-center gap-2'>
                    <div className={`rounded-full p-1.5 ${category.color}`}>
                      {category.icon}
                    </div>
                    <span>{category.name}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='font-medium'>
                      ${category.amount.toFixed(2)}
                    </span>
                    <Badge variant='outline' className='ml-2'>
                      {category.percentage}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
