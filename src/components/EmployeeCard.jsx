import { Paper, Text, Group, Button, Stack, Badge, ThemeIcon } from '@mantine/core';
import { UserPlus, Code, Megaphone, Microscope } from 'lucide-react';

const icons = {
  devs: { icon: Code, color: 'blue', label: 'Engineers' },
  marketers: { icon: Megaphone, color: 'orange', label: 'Marketers' },
  scientists: { icon: Microscope, color: 'purple', label: 'Researchers' }
};

export function EmployeeCard({ role, count, onHire, cost }) {
  const config = icons[role] || icons.devs;
  const Icon = config.icon;

  return (
    <Paper p="md" className="glass-panel" withBorder style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
      <Group justify="space-between">
        <Group>
          <ThemeIcon color={config.color} variant="light" size="xl" radius="md">
            <Icon size={22} />
          </ThemeIcon>
          <Stack gap={0}>
            <Text fw={700} size="sm">{config.label}</Text>
            <Text size="xs" c="dimmed">Active: {count}</Text>
          </Stack>
        </Group>
        <Stack gap={5} align="flex-end">
          <Badge color={config.color} variant="dot">${cost.toLocaleString()}</Badge>
          <Button 
            variant="light" 
            color={config.color} 
            size="compact-xs" 
            leftSection={<UserPlus size={12} />}
            onClick={() => onHire(role)}
          >
            Hire
          </Button>
        </Stack>
      </Group>
    </Paper>
  );
}