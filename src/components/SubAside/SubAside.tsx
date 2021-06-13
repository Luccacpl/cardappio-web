import React, { useEffect, useState } from 'react'

import { DivContainer, DivTitle, Title, SubTitle, SubMenu, TitleSubMenu, UlMenu,  AddButton } from './style'

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

interface ISubAside {
  children?: React.ReactNode
  clicked?: any
  title: string
  width?: string
  height?: string
  marginTop?: string
  color?: string

  addButtonText?: string
  items?:IItems[]
  
}


interface IItems {
  id: number
  name?: string
}


function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SubAside(props: ISubAside) {
  const [open, setOpen] = React.useState(false);

  const tamanho = props.items?.length;

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

 
  return (
    <DivContainer>
      <DivTitle>
        <Title>{props.title}</Title>
        <SubTitle> {tamanho} {props.title} achadas</SubTitle>
      </DivTitle>
      <SubMenu>
        <TitleSubMenu>{props.title}</TitleSubMenu>
        <UlMenu>
          {props.children}
        </UlMenu>
        <AddButton
          onClick={props.clicked}
          width={props.width}
          height={props.height}
          marginTop={props.marginTop}
          color={props.color}
        >
          {props.addButtonText}
        </AddButton>
      </SubMenu>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Item deletado com sucesso!
                </Alert>
      </Snackbar>
    </DivContainer>

  );
}

export default SubAside;


