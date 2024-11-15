import { ButtonGroup, Button, useColorModeValue } from '@chakra-ui/react';
import { Grid, List, Table as TableIcon } from 'lucide-react';

export type LayoutType = 'grid' | 'row' | 'table';

interface LayoutSwitcherProps {
  currentLayout: LayoutType;
  onLayoutChange: (layout: LayoutType) => void;
}

export const LayoutSwitcher = ({ currentLayout, onLayoutChange }: LayoutSwitcherProps) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const colorInvert = useColorModeValue('black', 'white');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const menuBgColor = useColorModeValue('gray.50', 'gray.700');

  return (
    <ButtonGroup size="sm" isAttached variant="outline">
      <Button
        leftIcon={<Grid size={16} />}
        onClick={() => onLayoutChange('grid')}
        color={currentLayout === 'grid' ? colorInvert : 'gray.500'}
        borderColor={currentLayout === 'grid' ? borderColor : borderColor}
        bg={currentLayout === 'grid' ? menuBgColor : 'transparent'}
        _hover={{
          bg: menuBgColor,
          borderColor: borderColor,
        }}
        _active={{
          bg: menuBgColor,
          borderColor: borderColor,
        }}
      >
        Grid
      </Button>
      <Button
        leftIcon={<List size={16} />}
        onClick={() => onLayoutChange('row')}
        color={currentLayout === 'row' ? colorInvert : 'gray.500'}
        borderColor={currentLayout === 'row' ? borderColor : borderColor}
        bg={currentLayout === 'row' ? menuBgColor : 'transparent'}
        _hover={{
          bg: menuBgColor,
          borderColor: borderColor,
        }}
        _active={{
          bg: menuBgColor,
          borderColor: borderColor,
        }}
      >
        Row
      </Button>
      <Button
        leftIcon={<TableIcon size={16} />}
        onClick={() => onLayoutChange('table')}
        color={currentLayout === 'table' ? colorInvert : 'gray.500'}
        borderColor={currentLayout === 'table' ? borderColor : borderColor}
        bg={currentLayout === 'table' ? menuBgColor : 'transparent'}
        _hover={{
          bg: menuBgColor,
          borderColor: borderColor,
        }}
        _active={{
          bg: menuBgColor,
          borderColor: borderColor,
        }}
      >
        Table
      </Button>
    </ButtonGroup>
  );
};