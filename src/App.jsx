import { AppShell, Text, Group, Button, Tabs, Paper, Title, Badge, Stack, SimpleGrid, Container, Progress, ActionIcon, Overlay, Center } from '@mantine/core';
import { useGameState } from './hooks/useGameState';
import { useEffect } from 'react';
import { Building2, Microscope, Rocket, Skull, RotateCcw, Activity, Plus, Minus, Megaphone, Trash2, Hammer } from 'lucide-react';
import { ValuationChart } from './components/ValuationChart';
import { TECH_TREE } from './data/techTree';

function App() {
  const game = useGameState();
  const totalStaff = game.products.reduce((acc, p) => acc + p.staff.devs + p.staff.scientists, 0);

  useEffect(() => {
    const interval = setInterval(() => game.tick(), 1000);
    return () => clearInterval(interval);
  }, [game]);

  if (game.isBankrupt) {
    return (
      <Overlay color="#000" backgroundOpacity={0.85} blur={15} zIndex={2000}>
        <Center style={{ height: '100vh', width: '100vw' }}>
          <Paper p="xl" className="glass-panel" ta="center" style={{ border: '2px solid #e74c3c' }}>
            <Skull size={80} color="#e74c3c" style={{ marginBottom: '20px' }} />
            <Title order={1} c="red.6" mb="sm">BANKRUPT</Title>
            <Text size="lg" mb="xl">The Treasury is empty. Your board of directors has removed you.</Text>

            <SimpleGrid cols={2} mb="xl">
              <Stack gap={0}>
                <Text size="xs" c="dimmed">FINAL VALUATION</Text>
                <Text fw={900} size="xl">${game.history[game.history.length - 1]?.valuation.toLocaleString() || 0}</Text>
              </Stack>
              <Stack gap={0}>
                <Text size="xs" c="dimmed">TOTAL USERS</Text>
                <Text fw={900} size="xl">{game.products.reduce((acc, p) => acc + p.users, 0).toLocaleString()}</Text>
              </Stack>
            </SimpleGrid>

            <Button size="lg" color="red" leftSection={<RotateCcw size={18}/>} onClick={game.dissolve}>
              Restart from Scratch
            </Button>
          </Paper>
        </Center>
      </Overlay>
    );
  }

  return (
    <AppShell header={{ height: 70 }} padding="md">
      <AppShell.Header p="md" className="glass-panel">
        <Container size="lg">
          <Group justify="space-between">
            <Title order={3} c="green.4">CONGLOMERATE OS</Title>
            <Group>
               <Badge color={totalStaff >= game.officeCapacity ? "red" : "blue"}>STAFF: {totalStaff}/{game.officeCapacity}</Badge>
               <Button variant="subtle" color="red.8" size="xs" onClick={game.dissolve}><Trash2 size={14}/></Button>
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Main>
        <Container size="lg">
          <SimpleGrid cols={{ base: 1, sm: 3 }} mb="md">
             <Paper p="md" className="glass-panel"><Text size="xs" c="dimmed">TREASURY</Text><Text fw={900} size="xl">${Math.floor(game.cash).toLocaleString()}</Text></Paper>
             <Paper p="md" className="glass-panel"><Text size="xs" c="dimmed">RESEARCH</Text><Text fw={900} size="xl">{Math.floor(game.researchPoints)} RP</Text></Paper>
             <Paper p="md" className="glass-panel"><Text size="xs" c="dimmed">PORTFOLIO USERS</Text><Text fw={900} size="xl">{game.products.reduce((acc, p) => acc + p.users, 0).toLocaleString()}</Text></Paper>
          </SimpleGrid>
          <Group position="center" mb="xl">
            <Button color="teal" onClick={game.founderHustle}>Founder Hustle (+$50, burn pause 1s)</Button>
          </Group>

          <Tabs defaultValue="portfolio" color="green">
            <Tabs.List grow mb="xl">
              <Tabs.Tab value="portfolio" leftSection={<Rocket size={16}/>}>Portfolio</Tabs.Tab>
              <Tabs.Tab value="forge" leftSection={<Hammer size={16}/>}>Forge</Tabs.Tab>
              <Tabs.Tab value="labs" leftSection={<Microscope size={16}/>}>Labs</Tabs.Tab>
              <Tabs.Tab value="infra" leftSection={<Building2 size={16}/>}>Infra</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="portfolio">
              <Stack gap="lg">
                {game.products.map(p => (
                  <Paper key={p.id} p="lg" className="glass-panel">
                    <Group justify="space-between" mb="xs">
                      <Title order={5}>{p.name} <Text span size="xs" c="dimmed">v{p.version}</Text></Title>
                      <Badge variant="dot" color="blue">{p.users.toLocaleString()} users</Badge>
                    </Group>
                    <Progress value={p.build} animated mb="md" color="blue" />
                    <SimpleGrid cols={2}>
                       <Group justify="space-between" className="glass-panel" p="xs">
                          <Text size="xs">Devs: {p.staff.devs}</Text>
                          <Group gap={4}>
                             <ActionIcon size="xs" color="red" onClick={() => game.adjustStaff(p.id, 'devs', -1)}><Minus/></ActionIcon>
                             <ActionIcon size="xs" color="blue" onClick={() => game.adjustStaff(p.id, 'devs', 1)}><Plus/></ActionIcon>
                          </Group>
                       </Group>
                       <Group justify="space-between" className="glass-panel" p="xs">
                          <Text size="xs">Sci: {p.staff.scientists}</Text>
                          <Group gap={4}>
                             <ActionIcon size="xs" color="red" onClick={() => game.adjustStaff(p.id, 'scientists', -1)}><Minus/></ActionIcon>
                             <ActionIcon size="xs" color="blue" onClick={() => game.adjustStaff(p.id, 'scientists', 1)}><Plus/></ActionIcon>
                          </Group>
                       </Group>
                    </SimpleGrid>
                  </Paper>
                ))}
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="forge">
               <Paper p="xl" className="glass-panel" ta="center">
                  <Title order={4} mb="md">Initialize New Product Line</Title>
                  <Text size="sm" c="dimmed" mb="xl">Combine current research to forge a randomized product line.</Text>
                  <Button size="lg" color="green" leftSection={<Hammer/>} onClick={game.forgeNewProduct} disabled={game.cash < 10000}>
                    Forge New Product ($10,000)
                  </Button>
               </Paper>
            </Tabs.Panel>

            <Tabs.Panel value="labs">
              <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
                {TECH_TREE.map(t => (
                  <Paper key={t.id} p="md" className="glass-panel">
                    <Text fw={700} size="sm">{t.name}</Text>
                    <Button fullWidth size="xs" mt="sm" disabled={game.unlockedTech.includes(t.id) || game.researchPoints < t.cost} onClick={() => game.unlockTech(t.id, t.cost)}>
                      {game.unlockedTech.includes(t.id) ? "Researched" : `Research (${t.cost} RP)`}
                    </Button>
                  </Paper>
                ))}
              </SimpleGrid>
            </Tabs.Panel>

            <Tabs.Panel value="infra">
               <SimpleGrid cols={2} spacing="md">
                  <Paper p="md" className="glass-panel">
                    <Title order={5} mb="xs">Office Space</Title>
                    <Button fullWidth onClick={game.buyOffice}>Expand to {game.officeCapacity + 10} Desks (${game.officeCapacity * 2000})</Button>
                  </Paper>
                  <Paper p="md" className="glass-panel">
                    <Title order={5} mb="xs">Marketing</Title>
                    <Button fullWidth color="orange" onClick={game.runMarketing} leftSection={<Megaphone size={14}/>}>Campaign ($5,000)</Button>
                  </Paper>
                  <Paper p="md" className="glass-panel" style={{gridColumn: 'span 2'}}>
                    <ValuationChart data={game.history} />
                  </Paper>
               </SimpleGrid>
            </Tabs.Panel>
          </Tabs>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;