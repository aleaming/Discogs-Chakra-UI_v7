import {
  VStack,
  HStack,
  Text,
  Box,
  IconButton,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import { X, AlertCircle, Bell, Package, Users, Search } from 'lucide-react';
import { Alert, AlertType } from './types';

interface AlertsListProps {
  alerts: Alert[];
}

export const AlertsList = ({ alerts }: AlertsListProps) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  const getAlertIcon = (type: AlertType) => {
    switch (type) {
      case 'price':
        return AlertCircle;
      case 'inventory':
        return Bell;
      case 'collection':
        return Package;
      case 'community':
        return Users;
      case 'saved_search':
        return Search;
      default:
        return Bell;
    }
  };

  const getPriorityColor = (priority: Alert['priority']) => {
    switch (priority) {
      case 'critical':
        return 'red';
      case 'high':
        return 'orange';
      case 'medium':
        return 'blue';
      case 'low':
        return 'gray';
    }
  };

  if (alerts.length === 0) {
    return (
      <Box textAlign="center" py={8} color={mutedColor}>
        <Bell size={40} style={{ margin: '0 auto 16px' }} />
        <Text>No alerts to display</Text>
      </Box>
    );
  }

  return (
    <VStack spacing={2} align="stretch">
      {alerts.map((alert) => {
        const Icon = getAlertIcon(alert.type);
        const colorScheme = getPriorityColor(alert.priority);

        return (
          <Box
            key={alert.id}
            p={4}
            borderRadius="md"
            bg={bgColor}
            borderWidth="1px"
            borderColor={alert.isRead ? 'transparent' : `${colorScheme}.200`}
            opacity={alert.isRead ? 0.7 : 1}
            _hover={{ bg: hoverBg }}
            transition="all 0.2s"
          >
            <HStack spacing={4} align="start">
              <Icon size={20} color={`var(--chakra-colors-${colorScheme}-500)`} />
              <Box flex={1}>
                <HStack justify="space-between" mb={1}>
                  <Text fontWeight="medium">{alert.title}</Text>
                  <HStack spacing={2}>
                    <Badge colorScheme={colorScheme} fontSize="xs">
                      {alert.priority}
                    </Badge>
                    <Text fontSize="xs" color={mutedColor}>
                      {new Date(alert.timestamp).toLocaleString()}
                    </Text>
                  </HStack>
                </HStack>
                <Text color={mutedColor} fontSize="sm">
                  {alert.message}
                </Text>
              </Box>
              <IconButton
                aria-label="Dismiss"
                icon={<X size={16} />}
                size="sm"
                variant="ghost"
              />
            </HStack>
          </Box>
        );
      })}
    </VStack>
  );
};