"use client"

import React, {useState} from 'react';
import {
    TextField,
    Button,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Box,
    Link
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {styled} from "@mui/system";

const Footer = styled("footer")`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    margin-bottom: 5mm;
    text-align: center;
`;

const CopyrightItem = styled(Typography)`
    display: flex;
    margin: 0 2mm;
`;

const HomePage: React.FC = () => {
    const [trials, setTrials] = useState<number>(100);
    const [switches, setSwitches] = useState<number>(1);
    const [baseAmount, setBaseAmount] = useState<number>(10);
    const [results, setResults] = useState<number[]>([]);
    const [average, setAverage] = useState<number | null>(null);

    const handleSimulate = () => {
        const res: number[] = [];
        for (let i = 0; i < trials; i++) {
            const s = baseAmount;
            // Set amount of money in each envelope
            const amountA = Math.random() < 0.5 ? s : 2 * s;
            const amountB = amountA === s ? 2 * s : s;
            // Determine which envelope to switch to
            const finalAmount = (switches + Math.random() < 0.5 ? 0 : 1) % 2 === 1 ? amountB : amountA;
            res.push(finalAmount);
        }
        setResults(res);
        const avg = res.reduce((sum, x) => sum + x, 0) / trials;
        setAverage(avg);
    };

    return (
        <Box sx={{width: '100%', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Box sx={{p: 4, justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', marginBottom: 4}}>
                <Typography variant="h4" gutterBottom>
                    Two Envelopes Problem
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Do you believe the money grows as you switch envelopes?
                </Typography>

                <Box sx={{display: 'flex', gap: 2, mb: 2, marginTop: 2}}>
                    <TextField
                        label="Trials"
                        type="number"
                        value={trials}
                        onChange={(e) => setTrials(Number(e.target.value))}
                    />
                    <TextField
                        label="Switches"
                        type="number"
                        value={switches}
                        onChange={(e) => setSwitches(Number(e.target.value))}
                    />
                    <TextField
                        label="Base Amount S"
                        type="number"
                        value={baseAmount}
                        onChange={(e) => setBaseAmount(Number(e.target.value))}
                    />
                </Box>

                <Button variant="contained" onClick={handleSimulate}>
                    START
                </Button>

                {average !== null && (
                    <Box sx={{mt: 3}}>
                        <Typography>
                            Average Amount: <strong>{average.toFixed(2)}</strong>
                        </Typography>

                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                <Typography>See details</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {results.map((amt, idx) => (
                                    <Typography key={idx}>
                                        Trial #{idx + 1}: {amt}
                                    </Typography>
                                ))}
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                )}
            </Box>
            <Footer>
                <CopyrightItem><Link href={"https://github.com/MUYUTwilighter"}>Xingyu Zhou</Link></CopyrightItem>
                <CopyrightItem>2025</CopyrightItem>
                <CopyrightItem>All rights reserved</CopyrightItem>
            </Footer>
        </Box>
    );
};

export default HomePage;
