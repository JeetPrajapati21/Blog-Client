import { Card, CardActionArea, CardContent, CardHeader, Grid, Hidden, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Skeleton from 'react-loading-skeleton';

const useStyles = makeStyles((theme) => ({
    card: {
      display: 'flex',
    },
    cardDetails: {
      flex: 1,
    },
    large: {
      width: theme.spacing(8),
      height: theme.spacing(8),
    },
}));

export default function HomeSkeleton() {
    const classes = useStyles();

    return (
        <Grid item xs={12} md={6}>
            <CardActionArea >
                <Card className={classes.card}>
                    <div className={classes.cardDetails}>
                        <CardHeader
                        avatar={
                            <Skeleton circle={true} height={64} width={64} />
                        }
                        title={<Skeleton height = {25}/>}
                        subheader={<Skeleton />}
                        />
                        <CardContent>
                        <Typography variant="subtitle1">
                            {<Skeleton />}
                        </Typography>
                        <Typography variant="subtitle1">
                            <Skeleton />
                        </Typography>
                        </CardContent>
                    </div>
                    <Hidden xsDown>
                        <Skeleton width={160} height="100%" />
                    </Hidden>
                </Card>
            </CardActionArea>
        </Grid>
    )
}
