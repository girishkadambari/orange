
import {Box, Divider, NavLink} from '@mantine/core';
import { IconGauge, IconFingerprint } from '@tabler/icons-react';
import React, {useState} from "react";


export  function  NavLinks(){
  const [active, setActive] = useState(0);

  return (
    <div>
      <NavLink
        label="Notifications"
        icon={<IconGauge size="1rem" stroke={1.5} />}
        childrenOffset={28}
      >
        <NavLink label="All" />
        <NavLink label="Published" />
        <NavLink label="Draft" />
        <NavLink label="Single-user" />
        <NavLink label="Expried" />
        <NavLink label="Archived" />
      </NavLink>
      <Divider my="sm" />
      <NavLink
        label="Preview"
        icon={<IconGauge size="1rem" stroke={1.5} />}
      />
      <NavLink
        label="Standalon Page"
        icon={<IconGauge size="1rem" stroke={1.5} />}
      />
      <NavLink
        label="Embeded Code"
        icon={<IconGauge size="1rem" stroke={1.5} />}
      />
    </div>
  );

}


