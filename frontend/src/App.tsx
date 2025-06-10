import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Autocomplete from '@mui/joy/Autocomplete';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import ChipDelete from '@mui/joy/ChipDelete';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import List from '@mui/joy/List';
import Stack from '@mui/joy/Stack';
import Divider from '@mui/joy/Divider';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';
import RadioGroup from '@mui/joy/RadioGroup';
import Radio from '@mui/joy/Radio';
import Slider from '@mui/joy/Slider';
import Sheet from '@mui/joy/Sheet';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails, {
  accordionDetailsClasses,
} from '@mui/joy/AccordionDetails';
import AccordionSummary, {
  accordionSummaryClasses,
} from '@mui/joy/AccordionSummary';

import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import Input from '@mui/joy/Input';

import Layout from './components/Layout';
import Header from './components/Header';
import Navigation from './components/Navigation';
import { handleAddPerson, handleDeletePerson } from './handles/Method';
import ManagingTeam from './components/ManagingTeam';

// import axios from 'axios';

type Greeting = {
  id: number;
  name: string;
  age: number;         // From Java Integer age;
  position: string;    // From Java String position;
  //active: boolean;     // From Java Boolean active; (for is_active)
  salary: number;      // From Java Double salary;
  bonus: number | null; // From Java Double bonus; (assuming it might be nullable based on typical usage, though not explicitly marked nullable in your given Java snippet for @Column)
  stock: number | null; // From Java Integer stock; (marked nullable in Java code)
  use_device: string | null; // From Java String use_device; (marked nullable in Java code)
  // createdAt: string;   // LocalDateTime usually serializes to ISO string
  // updatedAt: string;   // LocalDateTime usually serializes to ISO string
};

export default function TeamExample() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // State to hold the fetched greeting data
  //const [greetingInfo, setGreetingInfo] = useState<Greeting | null>(null);
  const [greetingsList, setGreetingsList] = useState<Greeting[]>([]);
  // State for loadding and error handling
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [salary, setSalary] = useState(0);
  const [bonus, setBonus] = useState<number | null>(null);
  const [stock, setStock] = useState<number | null>(null);
  const [useDevice, setUseDevice] = useState<string | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<string>('');

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

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    const fetchGreeting = async () => {
      try {
        const response = await fetch("/api/all"); 
        console.log('Fetch response status:', response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      /*
      * Get one Greeting structure
      */
      // const data: Greeting = await response.json();
      // setGreetingInfo(data);

      /*
      * Get first five Greeting structure
      */
      const data: Greeting[] = await response.json();
      setGreetingsList(data);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  fetchGreeting();
}, []);

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
          // On successful deletion, filter out the person from the local state to update the UI
          setGreetingsList(currentGreetings =>
              currentGreetings.filter(person => person.id !== id)
          );
      } catch (error) {
          console.error("Failed to delete person:", error);
          // Optionally, show an error to the user that deletion failed
      }
    }
  };
  
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
                  placeholder="Enter position (Programmer or Architect)"
                  options={[
                    // some of Thailand provinces
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
          <Layout.Header><Header /></Layout.Header>
          <Layout.SideNav><Navigation /></Layout.SideNav>
          <Layout.Main>
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
                  // onClick={onAddTeam}
                  >
                  Add new
                </Button>
                </Box>
            </Layout.SidePane>
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
                  value={selectedPosition}
                  onChange={(e, newValue) => {
                    setSelectedPosition(newValue || '');
                  }}
                />
              </Box>
            </AccordionDetails>
          </Accordion>
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
              TeamView
            </Typography>
            </Box>
          </Layout.SidePane>
          </Layout.Main>
        </Layout.Root>
  }/>
  </Routes> 

    </CssVarsProvider>
  );
}
