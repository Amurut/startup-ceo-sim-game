import { AppShell, Text, Group, Button, Tabs, Paper, Title, Badge, Stack, SimpleGrid, Container, Progress } from '@mantine/core';
import { Notifications, notifications } from '@mantine/notifications';
import { useGameState } from './hooks/useGameState';
import { useEffect } from 'react';
import { Wallet, Users, Zap, TrendingUp, Cpu, Rocket, RotateCcw, Microscope, Activity } from 'lucide-react';
import { EmployeeCard } from './components/EmployeeCard';
import { ValuationChart } from './components/ValuationChart';
import { TECH_TREE } from './data/techTree';

function App() {
  const game = useGameState();

  useEffect(() => {
    const interval = setInterval(() => {
      game.tick((title, message) => {
        notifications.show({ title, message, color: 'blue', variant: 'filled' });
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [game]);

  const StatDisplay = ({ icon: Icon, label, value, color }) => (
    <Paper p="md" className="glass-panel">
      <Group justify="space-between">
        <Stack gap={0}>
          <Text size="xs" c="dimmed" tt="uppercase" fw={700}>{label}</Text>
          <Text size="xl" fw={900} style={{ fontFamily: 'monospace' }}>{value}</Text>
        </Stack>
        <Icon size={20} color={color} />
      </Group>
    </Paper>
  );

  return (
    <>
      <Notifications />
      <AppShell header={{ height: 70 }} padding="md">
        <AppShell.Header p="md" className="glass-panel" style={{ border: 'none' }}>
          <Container size="lg">
            <Group justify="space-between">
              <Group>
                <Rocket color="#2ecc71" size={24} />
                <Title order={3} variant="gradient" gradient={{ from: 'green.4', to: 'cyan.4' }}>FounderOS</Title>
              </Group>
              <Badge variant="dot" color="green">v{game.currentVersion} Active</Badge>
            </Group>
          </Container>
        </AppShell.Header>

        <AppShell.Main>
          <Container size="lg">
            <SimpleGrid cols={{ base: 2, sm: 4 }} mb="xl">
              <StatDisplay icon={Wallet} label="Cash" value={`$${Math.floor(game.cash).toLocaleString()}`} color="#2ecc71" />
              <StatDisplay icon={Users} label="Users" value={game.users.toLocaleString()} color="#339af0" />
              <StatDisplay icon={Microscope} label="Research" value={Math.floor(game.researchPoints)} color="#be4bdb" />
              <StatDisplay icon={Zap} label="Hype" value={game.hype} color="#fcc419" />
            </SimpleGrid>

            <Tabs defaultValue="office" color="green" variant="pills">
              <Tabs.List grow mb="xl">
                <Tabs.Tab value="office" leftSection={<Cpu size={16} />}>Operations</Tabs.Tab>
                <Tabs.Tab value="tech" leftSection={<Microscope size={16} />}>R&D</Tabs.Tab>
                <Tabs.Tab value="growth" leftSection={<Activity size={16} />}>Market</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="office">
                <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
                  <Paper p="xl" className="glass-panel">
                    <Title order={4} mb="xs">Release Cycle: v{game.currentVersion}</Title>
                    <Text size="sm" c="dimmed" mb="md">Polish level affects Hype and User conversion upon launch.</Text>
                    <Progress value={game.buildPoints} size="xl" radius="xl" striped animated mb="xl" color={game.buildPoints > 80 ? 'green' : 'blue'} />
                    <Group grow>
                        <Button variant="light" size="lg" onClick={game.generateBuild}>🛠️ Dev Sprint</Button>
                        <Button variant="gradient" size="lg" gradient={{ from: 'green.5', to: 'teal.7' }} onClick={() => game.launchProduct(notifications.show)}>🚀 Launch</Button>
                    </Group>
                  </Paper>
                  <Stack>
                    <EmployeeCard role="devs" count={game.employees.devs} cost={1500} onHire={game.hireEmployee} />
                    <EmployeeCard role="scientists" count={game.employees.scientists} cost={2000} onHire={game.hireEmployee} />
                  </Stack>
                </SimpleGrid>
              </Tabs.Panel>

              <Tabs.Panel value="tech">
                <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
                  {TECH_TREE.map(tech => (
                    <Paper key={tech.id} p="md" className="glass-panel" opacity={game.unlockedTech.includes(tech.id) ? 0.6 : 1}>
                      <Title order={5}>{tech.name}</Title>
                      <Text size="xs" c="dimmed" mb="md" h={40}>{tech.description}</Text>
                      <Button fullWidth disabled={game.unlockedTech.includes(tech.id) || game.researchPoints < tech.cost} onClick={() => game.unlockTech(tech.id, tech.cost)}>
                        {game.unlockedTech.includes(tech.id) ? 'Unlocked' : `Research (${tech.cost} RP)`}
                      </Button>
                    </Paper>
                  ))}
                </SimpleGrid>
              </Tabs.Panel>

              <Tabs.Panel value="growth">
                <ValuationChart data={game.history} />
              </Tabs.Panel>
            </Tabs>

            <Group justify="center" mt={100}>
              <Button variant="subtle" color="gray" size="xs" leftSection={<RotateCcw size={14}/>} onClick={game.reset}>
                Reset All Progress
              </Button>
            </Group>
          </Container>
        </AppShell.Main>
      </AppShell>
    </>
  );
}

export default App;