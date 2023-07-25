import {useEffect, useState} from 'react';
import { Navbar, Center, Tooltip, UnstyledButton, createStyles, Stack, rem } from '@mantine/core';
import {
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
  IconLogout,
  IconSwitchHorizontal,
} from '@tabler/icons-react';
import {useLocation, useNavigate} from "react-router-dom";


const useStyles = createStyles((theme) => ({
  link: {
    width: rem(50),
    height: rem(50),
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    },
  },

  ttactive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));

interface NavbarLinkProps {
  icon: React.FC<any>;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton onClick={onClick} className={cx(classes.link, { [classes.ttactive]: active })}>
        <Icon size="1.2rem" stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconGauge, label: 'Notifications', link :"/notifications" },
  { icon: IconCalendarStats, label: 'NPS' , link: "/nps"},
  { icon: IconDeviceDesktopAnalytics, label: 'Analytics' ,link: "/analytics" },
  { icon: IconUser, label: 'Feedback' ,link: "/feedback"},
  { icon: IconFingerprint, label: 'Inbox',link:"/inbox" },
  { icon: IconSettings, label: 'Settings',link:"/settings" },
];

export function NavbarMinimal() {
  const [active, setActive] = useState("Inbox");
  let navigate = useNavigate();
  const location = useLocation();
  var currentTab = location.pathname.toString();

  useEffect(()=>{
    mockdata.map((link)=>{
      if(currentTab.includes(link.link)){
        setActive(link.label);
      }
    })
  },[])

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={link.label === active || currentTab.includes(link.link)}
      onClick={() => {
        setActive(link.label) ;
        navigate(link.link);
      }}
    />
  ));



  return (
    <Navbar height={"100%"} width={{ base: 80 }} p="md">
      <Center>
        <IconUser type="mark" size={30} />
      </Center>
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          <NavbarLink icon={IconSwitchHorizontal} label="Change account" />
          <NavbarLink icon={IconLogout} label="Logout" />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}