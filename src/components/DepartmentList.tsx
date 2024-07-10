import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  Checkbox,
  ListItemIcon,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

interface DepartmentData {
  department: string;
  sub_departments: string[];
}

const departments: DepartmentData[] = [
  {
    department: "customer_service",
    sub_departments: ["support", "customer_success"],
  },
  {
    department: "design",
    sub_departments: ["graphic_design", "product_design", "web_design"],
  },
];

const DepartmentList: React.FC = () => {
  const [open, setOpen] = useState<{ [key: string]: boolean }>({});
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});

  const handleToggle = (department: string) => {
    setOpen({ ...open, [department]: !open[department] });
  };

  const handleSelect = (department: string) => {
    const newSelected = { ...selected, [department]: !selected[department] };

    const deptData = departments.find((dep) => dep.department === department);
    if (deptData) {
      deptData.sub_departments.forEach((sub) => {
        newSelected[sub] = newSelected[department];
      });
    }

    departments.forEach((dep) => {
      if (
        dep.sub_departments.every((sub) => newSelected[sub]) &&
        dep.sub_departments.length > 0
      ) {
        newSelected[dep.department] = true;
      } else if (
        dep.sub_departments.some((sub) => !newSelected[sub]) &&
        dep.sub_departments.length > 0
      ) {
        newSelected[dep.department] = false;
      }
    });

    setSelected(newSelected);
  };

  const handleSelectSub = (department: string, sub: string) => {
    const newSelected = { ...selected, [sub]: !selected[sub] };

    const deptData = departments.find((dep) => dep.department === department);
    if (deptData) {
      if (deptData.sub_departments.every((subDep) => newSelected[subDep])) {
        newSelected[department] = true;
      } else {
        newSelected[department] = false;
      }
    }

    setSelected(newSelected);
  };

  return (
    <List>
      {departments.map((department) => (
        <div key={department.department}>
          <ListItem onClick={() => handleToggle(department.department)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={selected[department.department] || false}
                tabIndex={-1}
                disableRipple
                onChange={() => handleSelect(department.department)}
              />
            </ListItemIcon>
            <ListItemText primary={department.department} />
            {open[department.department] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse
            in={open[department.department]}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              {department.sub_departments.map((sub) => (
                <ListItem key={sub} style={{ paddingLeft: 32 }}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={selected[sub] || false}
                      tabIndex={-1}
                      disableRipple
                      onChange={() =>
                        handleSelectSub(department.department, sub)
                      }
                    />
                  </ListItemIcon>
                  <ListItemText primary={sub} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </div>
      ))}
    </List>
  );
};

export default DepartmentList;
