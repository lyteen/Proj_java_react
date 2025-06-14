// ========= Based React =========
import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
// ========= End ========= 

// ========= MUI Joy =========
import {
  Accordion,
  AccordionGroup,
  Autocomplete,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CssBaseline,
  Divider,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemContent,
  ListItemDecorator,
  Radio,
  RadioGroup,
  Slider,
  Sheet,
  Stack,
  Typography,
} from '@mui/joy';
import { CssVarsProvider } from '@mui/joy/styles';
import AccordionSummary, { accordionSummaryClasses } from '@mui/joy/AccordionSummary';
import ChipDelete from '@mui/joy/ChipDelete';
import AccordionDetails, { accordionDetailsClasses } from '@mui/joy/AccordionDetails';
// ========= End =========

// ========= Icon =========
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// ========= End =========

// ========= Customized =========
import Layout from './components/Layout';
import Header from './components/Header';
import Navigation from './components/Navigation';
import { handleAddPerson, handleDeletePerson, handleAddTeam, handleDeleteTeam } from './handles/Method';
// ========= End =========

// ========= TypeScript Type =========
type Greeting = {
  id: number;
  name: string;
  age: number;
  position: string;
  salary: number;
  bonus: number | null;
  stock: number | null;
  use_device: string | null;
  team: number | null;
};

type Team = {
  id: number;
  name: string;
};
// ========= End =========

// ========= Main Function =========
export default function TeamExample() {
  
  // ==== Person Set ====
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [salary, setSalary] = useState(0);
  const [bonus, setBonus] = useState<number | null>(null);
  const [stock, setStock] = useState<number | null>(null);
  const [useDevice, setUseDevice] = useState<string | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<string>('');

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [greetingsList, setGreetingsList] = useState<Greeting[]>([]);
  // State for loadding and error handling
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const handleClearForm = () => {
    if (window.confirm('Are you sure you want to clear all fields?')) {
      setName('');
      setSelectedPosition('');
      setUseDevice('');
      setBonus(0);
      setSalary(0);
      setAge(15);
      setStock(null);
    }
  };

  const onAddPerson = async () => {
    try {
      const newPerson = await handleAddPerson(
        name,
        age,
        selectedPosition,
        salary,
        bonus,
        stock,
        useDevice
      );

      // Update the UI 
      if (newPerson) {
        setGreetingsList(currentGreetings => [...currentGreetings, newPerson]);
        handleClearForm();
      }
    } catch (error) {
      console.error("Failed to add person:", error);
    }
  };

  const onDeletePerson = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this person? This action cannot be undone.')) {
      try {
          await handleDeletePerson(id);
          setGreetingsList(currentGreetings =>
              currentGreetings.filter(person => person.id !== id)
          );
      } catch (error) {
          console.error("Failed to delete person:", error);
      }
    }
  };

  const onDeletePersonFromTeam = useCallback(async (id: number) => {
    const memberToRemove = greetingsList.find(p => p.id === id);

    if (!memberToRemove) {
      console.error("Member not found in greetingsList for ID:", id);
      return;
    }

    if (window.confirm(`Are you sure you want to remove ${memberToRemove.name} from their team?`)) {
      try {
        // Create the updated object with team "null"
        const updatedMember: Greeting = { ...memberToRemove, team: null };

        const response = await fetch(`/api/updatePersonTeam/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedMember),
        });

        if (!response.ok) {
          throw new Error(`Failed to remove person from team! Status: ${response.status}`);
        }

        // Update GreetingsList
        setGreetingsList(currentGreetings =>
          currentGreetings.map(person =>
            person.id === id ? updatedMember : person
          )
        );

        // Remove the person from the currently displayed team members
        setTeamPerson(currentTeamPersons =>
          currentTeamPersons.filter(person => person.id !== id)
        );

      } catch (error) {
        console.error("Failed to remove person from team:", error);
      }
    }
  }, []);
  // ==== End ====

  // ==== Team Set ====
  const [teamsList, setTeamsList] = useState<Team[]>([]);
  const [teamName, setTeamName] = useState('');
  const [teamPerson, setTeamPerson] = useState<Greeting[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);

  const onAddTeam = async () => {
    try {
      const newTeam = await handleAddTeam(
        teamName,
      );

      // Update the UI 
      if (newTeam) {
        setTeamsList(currentTeams => [...currentTeams, newTeam]);
        handleClearForm();
      }
    } catch (error) {
      console.error("Failed to add person:", error);
    }
  };

  const onDeleteTeam = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this team? This action cannot be undone.')) {
      try {
          await handleDeleteTeam(id);
          // On successful deletion, filter out the person from the local state to update the UI
          setTeamsList(currentTeams =>
            currentTeams.filter(Team => Team.id !== id)
          );
      } catch (error) {
          console.error("Failed to delete team:", error);
          // Optionally, show an error to the user that deletion failed
      }
    }
  };

  const onRefreshTeam = (id: number) => {
    const filteredMember = greetingsList.filter(member => member.team == id)
    setTeamPerson(filteredMember);
  }

  type TeamBoxProps = {
    team: Team;
    onRefreshTeam: (id: number) => void; // Add this prop
  };

  const TeamBox = ({ team, onRefreshTeam }: TeamBoxProps) => {
    const [selectedMembers, setSelectedMembers] = useState<Greeting[]>([]);
    const hasArchitectInTeam = greetingsList.some(
      (member) => member.team === team.id && member.position === 'Architect'
    );
    const designerCountInTeam = greetingsList.filter(
      (member) => member.team === team.id && member.position === 'Designer'
    ).length;
    const isDesignerLimitReached = designerCountInTeam >= 2;

    // Optional member
    const availableMembers =  greetingsList.filter((member) => {

      if (member.team !== null) return false;
      
      // Work cannot be arranged for the rest teamMember
      if (team.id !== 1) {
        if (hasArchitectInTeam && member.position === 'Architect') {
          return false;
        }
  
        if (isDesignerLimitReached && member.position === 'Designer') {
          return false;
        }
      }
      return true;
    });
    
    // Deal with submit
    const handleAssignToTeam = async () => {
      if (selectedMembers.length === 0) return;

      const selectedIds = selectedMembers.map((m) => m.id);
      const updatedMembers = await Promise.all(
        greetingsList.map(async (member) => { // Filter for availableMembers should happen earlier if needed, but updating greetingsList directly based on selectedIds is fine here.
          if (selectedIds.includes(member.id)) {
            const updated = { ...member, team: team.id };
    
            // Sends to backend
            try {
              const response = await fetch(`/api/updatePersonTeam/${member.id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(updated),
              });
    
              if (!response.ok) {
                throw new Error(`Failed to update member ${member.id}`);
              }
    
              return updated; // Return the updated member
            } catch (error) {
              console.error(error);
              return member; // Return original on failure
            }
          }
          return member;
        })
      );
      setGreetingsList(updatedMembers);

      // Clear SelectedMember
      setSelectedMembers([]);
      onRefreshTeam(team.id);
    };
    
    return (
      <Card 
        variant="outlined"
        className={selectedTeamId === team.id ? 'active': ''}
        sx={{ '&.active': { bgcolor: 'primary.softBg', borderColor: 'primary.main' } }}
      >
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            {/* Joy UI uses `level` for typographic scale, not `variant` */}
            <Typography 
              level="title-lg" // e.g., 'h3', 'title-lg', 'body-md'
              onClick={() => {
                onRefreshTeam(team.id);
                setSelectedTeamId(team.id);
              }}
              sx={{ cursor: 'pointer', flexGrow: 1, mr: 1 }}
            >
              {team.name}
            </Typography>
            
            {/* Use Joy UI variants and colors for the IconButton */}
            <IconButton 
              variant="plain" 
              color="danger" 
              onClick={() => onDeleteTeam(team.id)}
              aria-label={`Delete ${team.name} team`}
            >
              <DeleteForeverRoundedIcon />
            </IconButton>
          </Stack>

          <Box sx={{ mt: 2 }}>
            <Typography level="body-sm" sx={{ mb: 1 }}>Manage Members</Typography>
            <Stack direction="row" spacing={1} alignItems="flex-start">
              {/* Joy UI's Autocomplete is simpler for this use case */}
              <Autocomplete
                multiple
                options={availableMembers}
                getOptionLabel={(option) => option.name}
                value={selectedMembers}
                onChange={(event, newValue) => {
                  setSelectedMembers(newValue);
                }}
                filterSelectedOptions
                placeholder="Add members..."
                sx={{ flexGrow: 1 }}
              />
              {/* Joy UI's idiomatic way to add icons is with `startDecorator` 
                or `endDecorator` instead of `startIcon`.
              */}
              <Button
                variant="solid" // 'solid' is a common variant for primary actions
                color="primary"
                size="md" // Joy UI sizes are slightly different
                onClick={handleAssignToTeam}
                disabled={selectedMembers.length === 0}
                startDecorator={<AddCircleOutlineIcon />}
              >
                Add
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    );
  };
  // ==== End ====

  // UseEffect to fetch data when the component mounts
  useEffect(() => {
    // Member fetching
    const fetchGreeting = async () => {
      try {
        const response = await fetch("/api/all"); 
        console.log('Fetch response status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: Greeting[] = await response.json();
        setGreetingsList(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Team fetching
    const fetchTeam = async () => {
      try {
        const response_team = await fetch("/api/Team");
        console.log('Team Fetch response status:', response_team.status);
        if (!response_team.ok) {
          throw new Error(`HTTP error! Status: ${response_team.status}`);
        }
        const data_team: Team[] = await response_team.json();
        setTeamsList(data_team);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGreeting();
    fetchTeam();
    }, 
    []
  );

  const logoUrls = {
    'Dribble': 'https://www.vectorlogo.zone/logos/dribbble/dribbble-icon.svg',
    'Pinterest': 'https://www.vectorlogo.zone/logos/pinterest/pinterest-icon.svg',
    'Google': 'https://www.vectorlogo.zone/logos/google/google-icon.svg',
    'Amazon': 'https://www.vectorlogo.zone/logos/amazon/amazon-icon.svg',
    'Microsoft': 'https://www.vectorlogo.zone/logos/microsoft/microsoft-icon.svg',
    'IBM': 'https://www.vectorlogo.zone/logos/ibm/ibm-icon.svg',
    'Adobe': 'https://www.vectorlogo.zone/logos/adobe/adobe-icon.svg',
    'Apple': 'https://www.vectorlogo.zone/logos/apple/apple-icon.svg',
  };

  const skills = [
    'UI design',
    'Illustration',
    'SOTA',
    'HTML',
    'CSS',
    'JavaScript',
    'Java',
    'Python',
    'DeepLearning',
    'Product Management',
    'Market Analysis',
    'Graphic Design'
  ]

  const companyRoles = [
    'UI Engineer',
    'Senior designer',
    'Designer',
    'Frontend Developer',
    'Product Manager',
    'Product Analyst',
    'Graphic Designer',
    'Game Developer',
    'Backend engineer'
  ]

  const logoUrlValues = Object.values(logoUrls);
  const logoUrlName = Object.keys(logoUrls);

  const peopleData = greetingsList.map((greeting: Greeting) => ({
    id: greeting.id,
    name: greeting.name,
    position: greeting.position, // Change member position
    avatar2x: `https://i.pravatar.cc/80?img=${greeting.id % 20}`,
    companyData: [
      {
        role: companyRoles[((greeting.id || 0) % companyRoles.length)], // Change member position
        name: logoUrlName[(greeting.id || 0) % logoUrlName.length],
        logo: logoUrlValues[(greeting.id || 0) % logoUrlValues.length],
        years: '2015-now',
      },
    ],
    skills: [skills[greeting.id % skills.length], skills[(greeting.id * 2) % skills.length]],
  }));

  const teamData = teamPerson.map((greeting: Greeting) => ({
    id: greeting.id,
    name: greeting.name,
    position: greeting.position, // Change member position
    avatar2x: `https://i.pravatar.cc/80?img=${greeting.id % 20}`,
    companyData: [
      {
        role: companyRoles[((greeting.id || 0) % companyRoles.length)], // Change member position
        name: logoUrlName[(greeting.id || 0) % logoUrlName.length],
        logo: logoUrlValues[(greeting.id || 0) % logoUrlValues.length],
        years: '2015-now',
      },
    ],
    skills: [skills[greeting.id % skills.length], skills[(greeting.id * 2) % skills.length]],
  }));

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      {drawerOpen && (
        <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
          <Navigation />
        </Layout.SideDrawer>
      )}
      <Stack
        id="tab-bar"
        direction="row"
        spacing={1}
        sx={{
          justifyContent: 'space-around',
          display: { xs: 'flex', sm: 'none' },
          zIndex: '999',
          bottom: 0,
          position: 'fixed',
          width: '100dvw',
          py: 2,
          backgroundColor: 'background.body',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Button
          variant="plain"
          color="neutral"
          component="a"
          href="/joy-ui/getting-started/templates/email/"
          size="sm"
          startDecorator={<EmailRoundedIcon />}
          sx={{ flexDirection: 'column', '--Button-gap': 0 }}
        >
          Email
        </Button>
        <Button
          variant="plain"
          color="neutral"
          aria-pressed="true"
          component="a"
          href="/joy-ui/getting-started/templates/team/"
          size="sm"
          startDecorator={<PeopleAltRoundedIcon />}
          sx={{ flexDirection: 'column', '--Button-gap': 0 }}
        >
          Team
        </Button>
        <Button
          variant="plain"
          color="neutral"
          component="a"
          href="/joy-ui/getting-started/templates/files/"
          size="sm"
          startDecorator={<FolderRoundedIcon />}
          sx={{ flexDirection: 'column', '--Button-gap': 0 }}
        >
          Files
        </Button>
      </Stack>
    <Routes>
      <Route path="/" element={
        <Layout.Root
        sx={[
          drawerOpen && {
            height: '100vh',
            overflow: 'hidden',
          },
        ]}
        >
          <Layout.Header>
            <Header />
          </Layout.Header>
          <Layout.SideNav>
            <Navigation /> 
          </Layout.SideNav>
          <Layout.SidePane>
            <Box
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography level="title-lg" textColor="text.secondary" component="h1">
                People
              </Typography>
              <Button startDecorator={
                <PersonRoundedIcon />}
                size="sm"
                onClick={onAddPerson}
                >
                Add new
              </Button>
            </Box>
            <Box
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography level="title-md">Reset</Typography>
              <Button
                size="sm"
                variant="outlined"
                onClick={handleClearForm}
                sx={{ transition: 'all 0.5s ease' }}
              >
                Clear
              </Button>
            </Box>
            <AccordionGroup
              sx={{
                [`& .${accordionDetailsClasses.content}`]: {
                  px: 2,
                },
                [`& .${accordionSummaryClasses.button}`]: {
                  px: 2,
                },
              }}
            >
              <Accordion defaultExpanded>
                <AccordionSummary>
                  <Typography level="title-sm">Name</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ my: 2 }}>
                    <Autocomplete
                      size="sm"
                      freeSolo
                      options={[]}
                      placeholder="Enter name (e.g. Jim)"
                      value={name}
                      onChange={(e, newValue) => {
                        setName(newValue || '');
                      }}
                      inputValue={name}
                      onInputChange={(e, newInputValue) => {
                        setName(newInputValue);
                      }}
                      sx={{
                        '& .MuiAutocomplete-input': {
                          minWidth: '150px',
                        }
                      }}
                    />
                    <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Typography level="title-sm">Age</Typography>
                      <Slider
                        size="sm"
                        variant="solid"
                        valueLabelFormat={(value) => `${value} ${value === 1 ? 'year' : 'years'} old`} // Handles singular/plural
                        value={age}
                        onChange={(event: Event, newValue: number | number[]) => {
                          // Handle both single value and range cases
                          setAge(Array.isArray(newValue) ? newValue[0] : newValue);
                        }}
                        defaultValue={25}
                        step={1}
                        min={15}  // More realistic minimum age
                        max={75}
                        valueLabelDisplay="auto" // Only shows on hover/focus
                        marks={[
                          { value: 18, label: '18' },
                          { value: 30, label: '30' },
                          { value: 50, label: '50' },
                          { value: 70, label: '70' },
                        ]}
                        sx={{
                          '& .MuiSlider-markLabel': {
                            fontSize: '0.75rem',
                            top: '20px'
                          }
                        }}
                      />
                      <Typography level="body-xs" sx={{ alignSelf: 'flex-end' }}>
                        Selected: {age} years
                      </Typography>
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>

              <Accordion defaultExpanded>
                <AccordionSummary>
                  <Typography level="title-sm">Position</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ my: 2 }}>
                    <Autocomplete
                      size="sm"
                      placeholder="Enter position"
                      options={[
                        // some of Thailand provinces
                        'Designer',
                        'Programmer',
                        'Architect'
                      ]}
                      value={selectedPosition}
                      onChange={(e, newValue) => {
                        setSelectedPosition(newValue || '');
                      }}
                    />
                    <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 1}}>
                      <Typography level="title-sm">Salary</Typography>
                      <Slider
                        size="sm"
                        variant="solid"
                        valueLabelFormat={(value) => `${value} 💲`}
                        value={salary}
                        onChange={(e, newValue) => {
                          setSalary(Array.isArray(newValue) ? newValue[0] : newValue);
                        }}
                        defaultValue={6000}
                        step={10}
                        min={0}
                        max={10000}
                        valueLabelDisplay="auto"
                        marks={[
                          { value: 3000, label: '3000' },
                          { value: 5000, label: '5000' },
                          { value: 7000, label: '7000' },
                          { value: 9000, label: '9000' },
                        ]}
                        sx={{
                          '& .MuiSlider-markLabel': {
                            fontSize: '0.75rem',
                            top: '20px'
                          }
                        }}
                      />
                      <Typography level="body-xs" sx={{ alignSelf: 'flex-end' }}>
                        Selected: {salary}  💲
                      </Typography>
                    </Box>
                    <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 1}}>
                      <Typography level="title-sm">Bonus</Typography>
                      <Slider
                        size="sm"
                        variant="solid"
                        valueLabelFormat={(value) => `${value} 💲`}
                        value={bonus || 0}
                        onChange={(e, newValue) => {
                          setBonus(Array.isArray(newValue) ? newValue[0] : newValue);
                        }}
                        defaultValue={6000}
                        step={10}
                        min={0}
                        max={10000}
                        valueLabelDisplay="auto"
                        marks={[
                          { value: 3000, label: '3000' },
                          { value: 5000, label: '5000' },
                          { value: 7000, label: '7000' },
                          { value: 9000, label: '9000' },
                        ]}
                        sx={{
                          '& .MuiSlider-markLabel': {
                            fontSize: '0.75rem',
                            top: '20px'
                          }
                        }}
                      />
                      <Typography level="body-xs" sx={{ alignSelf: 'flex-end' }}>
                        Selected: {bonus}  💲
                      </Typography>
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>

              <Accordion defaultExpanded>
                <AccordionSummary>
                  <Typography level="title-sm">UseDevice</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ my: 2 }}>
                    <Autocomplete
                      size="sm"
                      freeSolo
                      options={[]}
                      placeholder="Enter Use Device (e.g. Lenovo)"
                      value={useDevice}
                      onChange={(e, newValue) => {
                        setUseDevice(newValue || '');
                      }}
                      inputValue={useDevice || ''}
                      onInputChange={(e, newInputValue) => {
                        setUseDevice(newInputValue);
                      }}
                      sx={{
                        '& .MuiAutocomplete-input': {
                          minWidth: '150px',
                        }
                      }}
                    />
                  </Box>
                </AccordionDetails>
              </Accordion>

              <Accordion defaultExpanded>
                <AccordionSummary>
                  <Typography level="title-sm">Stock</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Box sx={{ my: 2 }}>
                  {/* <Typography level="body-sm" sx={{ mb: 1 }}>Stock Quantity</Typography> */}
                  <Input
                      size="sm"
                      type="number" // Use type="number" for numerical input
                      placeholder="Enter Stock Quantity"
                      value={stock !== null ? stock : ''} // Display empty string for null
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        setStock(isNaN(value) ? null : value); // Set to null if not a valid number
                      }}
                      sx={{
                        '& .MuiInput-input': { // Adjust selector for Joy UI Input
                          minWidth: '150px',
                        }
                      }}
                    />
                  </Box>
                </AccordionDetails>
              </Accordion>

              <Accordion defaultExpanded>
                <AccordionSummary>
                  <Typography level="title-sm">Keywords (Optional)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ my: 2 }}>
                    <Autocomplete
                      size="sm"
                      placeholder="Position, skills, etc…"
                      options={[
                        {
                          category: 'Position',
                          title: 'Frontend engineer',
                        },
                        {
                          category: 'Position',
                          title: 'Backend engineer',
                        },
                        {
                          category: 'Position',
                          title: 'Product manager',
                        },
                        {
                          category: 'Skill',
                          title: 'JavaScript',
                        },
                        {
                          category: 'Skill',
                          title: 'TypeScript',
                        },
                        {
                          category: 'Skill',
                          title: 'Project management',
                        },
                      ]}
                      groupBy={(option) => option.category}
                      getOptionLabel={(option) => option.title}
                    />
                    <Box sx={{ my: 2, display: 'flex', gap: 1 }}>
                      <Chip
                        variant="soft"
                        size="sm"
                        endDecorator={<ChipDelete variant="soft" />}
                      >
                        UI designer
                      </Chip>
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>

              <Accordion defaultExpanded>
                <AccordionSummary>
                  <Typography level="title-sm">Education  (Optional)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ my: 2 }}>
                    <RadioGroup name="education" defaultValue="any">
                      <Radio label="Any" value="any" size="sm" />
                      <Radio label="High School" value="high-school" size="sm" />
                      <Radio label="College" value="college" size="sm" />
                      <Radio label="Post-graduate" value="post-graduate" size="sm" />
                    </RadioGroup>
                  </Box>
                </AccordionDetails>
              </Accordion>
              <Accordion defaultExpanded>
                <AccordionSummary>
                  <Typography level="title-sm">Years of Experience (Optional)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ my: 2 }}>
                    <Slider
                      size="sm"
                      valueLabelFormat={(value) => `${value} years`}
                      defaultValue={[5, 10]}
                      step={1}
                      min={0}
                      max={30}
                      valueLabelDisplay="on"
                    />
                  </Box>
                </AccordionDetails>
              </Accordion>
              <Accordion defaultExpanded>
                <AccordionSummary>
                  <Typography level="title-sm">Languages Spoken  (Optional)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ my: 2 }}>
                    <Autocomplete
                      size="sm"
                      multiple
                      placeholder="Select languages"
                      options={[
                        'English',
                        'French',
                        'German',
                        'Portuguese',
                        'Spanish',
                      ]}
                      getOptionLabel={(option) => option}
                      filterSelectedOptions
                    />
                  </Box>
                </AccordionDetails>
              </Accordion>
            </AccordionGroup>
          </Layout.SidePane>
          <Layout.Main>
            <List
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: 2,
              }}
            >
              {peopleData.map((person) => (
                <Sheet
                  key={person.id}
                  component="li"
                  variant="outlined"
                  sx={{ borderRadius: 'sm', p: 2, listStyle: 'none' }}
                >
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between', alignItems: 'flex-start' }}></Box>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Avatar
                      variant="outlined"
                      src={person.avatar2x}
                      srcSet={`${person.avatar2x} 2x`}
                      sx={{ borderRadius: '50%' }}
                    />
                    <div>
                      <Typography level="title-md">{person.name}</Typography>
                      <Typography level="body-xs">{person.position}</Typography>
                    </div>

                    <Button
                    size="sm"
                    variant="soft"
                    //  color="danger"
                    onClick={() => onDeletePerson(person.id)}
                    sx={{
                      '--Button-gap': '0.3rem',
                      padding: '2px 6px',
                      fontSize: '0.75rem',
                      minHeight: 'auto',
                      lineHeight: 1.2,
                    }}
                    >
                        {/* <DeleteForeverRoundedIcon /> */}
                        Delete
                    </Button>
                  </Box>
                  <Divider component="div" sx={{ my: 2 }} />
                  <List sx={{ '--ListItemDecorator-size': '40px', gap: 2 }}>
                    {person.companyData.map((company, companyIndex) => (
                      <ListItem key={companyIndex} sx={{ alignItems: 'flex-start' }}>
                        <ListItemDecorator
                          sx={{
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              height: '100%',
                              width: '1px',
                              bgcolor: 'divider',
                              left: 'calc(var(--ListItem-paddingLeft) + 12px)',
                              top: '50%',
                            },
                          }}
                        >
                          <Avatar
                            src={company.logo}
                            sx={{ '--Avatar-size': '24px' }}
                          />
                        </ListItemDecorator>
                        <ListItemContent>
                          <Typography level="title-sm">{company.role}</Typography>
                          <Typography level="body-xs">{company.name}</Typography>
                        </ListItemContent>
                        <Typography level="body-xs">{company.years}</Typography>
                      </ListItem>
                    ))}
                  </List>
                  <Button
                    size="sm"
                    variant="plain"
                    endDecorator={<KeyboardArrowRightRoundedIcon fontSize="small" />}
                    sx={{ px: 1, mt: 1 }}
                  >
                    Expand
                  </Button>
                  <Divider component="div" sx={{ my: 2 }} />
                  <Typography level="title-sm">Skills tags:</Typography>
                  <Box sx={{ mt: 1.5, display: 'flex', gap: 1 }}>
                    {person.skills.map((skill, skillIndex) => (
                      <Chip
                        key={skillIndex}
                        variant="outlined"
                        color="neutral"
                        size="sm"
                      >
                        {skill}
                      </Chip>
                    ))}
                  </Box>
                </Sheet>
              ))}
            </List>
          </Layout.Main>
        </Layout.Root>
      }/>

      <Route path="/Team" element={
        <Layout.Root
          sx={[
            drawerOpen && {
              height: '100vh',
              overflow: 'hidden',
            },
          ]}
        >
          <Layout.Header>
            <Header />
          </Layout.Header>
          <Layout.SideNav>
            <Navigation />
          </Layout.SideNav>
            {/* <ManagingTeam /> */}
          <Layout.SidePane>
            <Box
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography level="title-lg" textColor="text.secondary" component="h1">
                Team
              </Typography>
              <Button startDecorator={
                <Diversity3Icon />}
                size="sm"
                onClick={onAddTeam}
                >
                Add new
              </Button>
            </Box>
            <Accordion defaultExpanded>
              <AccordionSummary>
                <Typography level="title-sm">TeamName</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ my: 2 }}>
                  <Autocomplete
                    size="sm"
                    placeholder="Enter team name (e.g. Bro)"
                    freeSolo
                    options={[]}
                    value={teamName}
                    onChange={(e, newValue) => {
                      setTeamName(newValue || '');
                    }}
                    inputValue={teamName}
                    onInputChange={(e, newInputValue) => {
                      setTeamName(newInputValue);
                    }}
                    sx={{
                      '& .MuiAutocomplete-input': {
                        minWidth: '150px',
                      }
                    }}
                  />
                </Box>
              </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded>
              <AccordionSummary>
                <Typography level="title-lg" textColor="title-sm" component="h1">
                  TeamView
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box
                    sx={{
                      p: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                  </Box>
                  <Box>
                    <List
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: 2,
                      }}
                    >
                    {teamsList.map((team) => (
                      <TeamBox
                        key={team.id}
                        team={team}
                        onRefreshTeam={onRefreshTeam}
                        // allMembers={greetingsList}
                        // setAllMembers={setGreetingsList}
                      />
                    ))}
                    </List>
                  </Box>
              </AccordionDetails>
            </Accordion>
          </Layout.SidePane>
          <Layout.Main>
            <List
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: 2,
              }}
            >
              {teamData.map((person) => (
                <Sheet
                  key={person.id}
                  component="li"
                  variant="outlined"
                  sx={{ borderRadius: 'sm', p: 2, listStyle: 'none' }}
                >
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between', alignItems: 'flex-start' }}></Box>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Avatar
                      variant="outlined"
                      src={person.avatar2x}
                      srcSet={`${person.avatar2x} 2x`}
                      sx={{ borderRadius: '50%' }}
                    />
                    <div>
                      <Typography level="title-md">{person.name}</Typography>
                      <Typography level="body-xs">{person.position}</Typography>
                    </div>

                    <Button
                    size="sm"
                    variant="soft"
                    //  color="danger"
                    onClick={() => onDeletePersonFromTeam(person.id)}
                    sx={{
                      '--Button-gap': '0.3rem',
                      padding: '2px 6px',
                      fontSize: '0.75rem',
                      minHeight: 'auto',
                      lineHeight: 1.2,
                    }}
                    >
                      Delete
                    </Button>
                  </Box>
                  <Divider component="div" sx={{ my: 2 }} />
                  <List sx={{ '--ListItemDecorator-size': '40px', gap: 2 }}>
                    {person.companyData.map((company, companyIndex) => (
                      <ListItem key={companyIndex} sx={{ alignItems: 'flex-start' }}>
                        <ListItemDecorator
                          sx={{
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              height: '100%',
                              width: '1px',
                              bgcolor: 'divider',
                              left: 'calc(var(--ListItem-paddingLeft) + 12px)',
                              top: '50%',
                            },
                          }}
                        >
                          <Avatar
                            src={company.logo}
                            sx={{ '--Avatar-size': '24px' }}
                          />
                        </ListItemDecorator>
                        <ListItemContent>
                          <Typography level="title-sm">{company.role}</Typography>
                          <Typography level="body-xs">{company.name}</Typography>
                        </ListItemContent>
                        <Typography level="body-xs">{company.years}</Typography>
                      </ListItem>
                    ))}
                  </List>
                  <Button
                    size="sm"
                    variant="plain"
                    endDecorator={<KeyboardArrowRightRoundedIcon fontSize="small" />}
                    sx={{ px: 1, mt: 1 }}
                  >
                    Expand
                  </Button>
                  <Divider component="div" sx={{ my: 2 }} />
                  <Typography level="title-sm">Skills tags:</Typography>
                  <Box sx={{ mt: 1.5, display: 'flex', gap: 1 }}>
                    {person.skills.map((skill, skillIndex) => (
                      <Chip
                        key={skillIndex}
                        variant="outlined"
                        color="neutral"
                        size="sm"
                      >
                        {skill}
                      </Chip>
                    ))}
                  </Box>
                </Sheet>
              ))}
            </List>
          </Layout.Main>         
        </Layout.Root>
      }/>
    </Routes> 
  </CssVarsProvider>);
}
