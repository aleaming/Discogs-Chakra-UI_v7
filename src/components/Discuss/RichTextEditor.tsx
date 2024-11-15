import {
  Box,
  ButtonGroup,
  IconButton,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  Bold,
  Italic,
  Link,
  List,
  Image,
  Code,
  Quote,
} from 'lucide-react';
import { useState } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export const RichTextEditor = ({
  value,
  onChange,
  placeholder,
  minHeight = '200px',
}: RichTextEditorProps) => {
  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);

  const handleSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    setSelectionStart(target.selectionStart);
    setSelectionEnd(target.selectionEnd);
  };

  const insertMarkdown = (prefix: string, suffix: string = prefix) => {
    const newValue =
      value.substring(0, selectionStart) +
      prefix +
      value.substring(selectionStart, selectionEnd) +
      suffix +
      value.substring(selectionEnd);
    onChange(newValue);
  };

  const toolbarButtons = [
    { icon: Bold, action: () => insertMarkdown('**'), tooltip: 'Bold' },
    { icon: Italic, action: () => insertMarkdown('*'), tooltip: 'Italic' },
    { icon: Link, action: () => insertMarkdown('[', '](url)'), tooltip: 'Link' },
    { icon: List, action: () => insertMarkdown('- '), tooltip: 'List' },
    {
      icon: Image,
      action: () => insertMarkdown('![alt text](', ')'),
      tooltip: 'Image',
    },
    { icon: Code, action: () => insertMarkdown('`'), tooltip: 'Code' },
    { icon: Quote, action: () => insertMarkdown('> '), tooltip: 'Quote' },
  ];

  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      borderColor={useColorModeValue('gray.200', 'gray.600')}
    >
      <ButtonGroup
        size="sm"
        isAttached
        variant="ghost"
        borderBottomWidth="1px"
        borderColor={useColorModeValue('gray.200', 'gray.600')}
        p={2}
      >
        {toolbarButtons.map(({ icon: Icon, action, tooltip }) => (
          <IconButton
            key={tooltip}
            icon={<Icon size={16} />}
            aria-label={tooltip}
            onClick={action}
          />
        ))}
      </ButtonGroup>

      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onSelect={handleSelect}
        placeholder={placeholder}
        minH={minHeight}
        p={4}
        border="none"
        _focus={{ border: 'none', boxShadow: 'none' }}
        resize="vertical"
      />
    </Box>
  );
};