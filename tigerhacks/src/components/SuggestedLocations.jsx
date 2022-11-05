import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import pizza from '../assets/pizza.png';
import park from '../assets/park.jpg';
import disney from '../assets/disney.webp';
import './SuggestedLocations.css'

export default function SuggestedLocations() {

    return (
        <div className="cardsContainter">
            <div className="section">
                <div className="containertitle">
                    <p className='containertitletext'>Suggested Locations</p>
                </div>
                <div className="scrollable">
                    <div className="carditem">
                        <Card sx={{ maxWidth: 200 }}>
                            <CardMedia
                                component="img"
                                height="60"
                                image={pizza}
                                alt="pizza plaza"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Pizza Plaza
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Pizza Plaza is a hot spot, and known for there deep dish pizza
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    </div>

                    <div className="carditem">
                        <Card sx={{ maxWidth: 200 }}>
                            <CardMedia
                                component="img"
                                height="60"
                                image={park}
                                alt="peace park"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Peace Park
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Peace Park is a famous Park known for its sculptures
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    </div>

                    <div className="carditem">
                        <Card sx={{ maxWidth: 200 }}>
                            <CardMedia
                                component="img"
                                height="60"
                                image={disney}
                                alt="Disney World"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Disney World
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Disney World includes loads of fun or people of all ages with rides and food.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    </div>
                </div>

            </div>


        </div>
    )

}