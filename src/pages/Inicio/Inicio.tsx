import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Aside from '../../components/Aside/Aside'
import SubAside from '../../components/SubAside/SubAside'
import Container from '../../components/Container/Container'
import { Grid } from '../../components/Grid/style'


function Inicio() {
    return (
        <Grid>
            <Aside />
            {/* <SubAside title="Inicio" /> */}
            <Container>
                <Grid grid="auto/ 1.5fr 2fr 2fr 2fr 1.5fr" gridGap="2.5% 2.5%" rowGap="2.5%" marginTop="2%">

                </Grid>
                <Grid grid="auto/ 1.5fr 2fr 2fr 2fr 1.5fr" gridGap="2.5%" rowGap="10px">

                </Grid>
            </Container>
        </Grid>
    );
}

export default Inicio;