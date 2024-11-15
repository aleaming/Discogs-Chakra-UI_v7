import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useColorModeValue,
  Select,
  HStack,
} from '@chakra-ui/react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { useState } from 'react';
import type { MarketStats } from './types';

interface MarketStatsProps {
  stats: MarketStats;
}

export const MarketStats = ({ stats }: MarketStatsProps) => {
  const [timeRange, setTimeRange] = useState('6m');
  const chartColor = useColorModeValue('brand.500', 'brand.200');
  const gridColor = useColorModeValue('gray.200', 'gray.700');

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;
  const formatDate = (date: string) => new Date(date).toLocaleDateString();

  return (
    <Box>
      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} mb={8}>
        <Stat>
          <StatLabel>Lowest Price</StatLabel>
          <StatNumber>{formatPrice(stats.lowestPrice)}</StatNumber>
          <StatHelpText>Last 30 days</StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Median Price</StatLabel>
          <StatNumber>{formatPrice(stats.medianPrice)}</StatNumber>
          <StatHelpText>Last 30 days</StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Highest Price</StatLabel>
          <StatNumber>{formatPrice(stats.highestPrice)}</StatNumber>
          <StatHelpText>Last 30 days</StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Total Sales</StatLabel>
          <StatNumber>{stats.totalSales}</StatNumber>
          <StatHelpText>All time</StatHelpText>
        </Stat>
      </SimpleGrid>

      <HStack justify="flex-end" mb={4}>
        <Select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          width="120px"
          size="sm"
        >
          <option value="1m">1 Month</option>
          <option value="3m">3 Months</option>
          <option value="6m">6 Months</option>
          <option value="1y">1 Year</option>
          <option value="all">All Time</option>
        </Select>
      </HStack>

      <Box height="300px" mb={8}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={stats.priceHistory}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColor} stopOpacity={0.2} />
                <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              stroke={gridColor}
            />
            <YAxis
              tickFormatter={formatPrice}
              stroke={gridColor}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: useColorModeValue('white', 'gray.800'),
                border: '1px solid',
                borderColor: gridColor,
              }}
              formatter={(value: number) => formatPrice(value)}
              labelFormatter={formatDate}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke={chartColor}
              fillOpacity={1}
              fill="url(#colorPrice)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>

      <Box height="200px">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={stats.priceHistory}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              stroke={gridColor}
            />
            <YAxis stroke={gridColor} />
            <Tooltip
              contentStyle={{
                backgroundColor: useColorModeValue('white', 'gray.800'),
                border: '1px solid',
                borderColor: gridColor,
              }}
              formatter={(value: number) => value}
              labelFormatter={formatDate}
            />
            <Line
              type="monotone"
              dataKey="volume"
              stroke={chartColor}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};