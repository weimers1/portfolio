import React from 'react';
import { HexGrid, Layout, Hexagon, Text } from 'react-hexgrid';
import useScreenSize from '../hooks/useScreenSize';

function CircularHexGrid({ totalHexagons }) {
    let layers = 1;
    const screenSize = useScreenSize();

    const generateHexagons = (numHexagons) => {
        const hexagons = [{ q: 0, r: 0, s: 0 }];

        if (numHexagons <= 1) return hexagons;

        let count = 1;
        let q = 0;
        let r = 0;
        let s = 0;
        let maxIterations = 100;
        while (count < numHexagons && maxIterations > 0) {
            /*
             * I wrote out the pattern I saw for each layer's transition rules (coordinate ++/--) and noticed
             * the way I want each layer to grow requires the second side's rule to be executed one fewer
             * time than the other rules
             */
            let skippedSecondSideThisLayer = false;

            for (let side = 0; side < 6; side++) {
                for (let i = 0; i < layers; i++) {
                    if (side === 0) {
                        q--;
                        s++;
                    } else if (side === 1) {
                        if (!skippedSecondSideThisLayer) {
                            skippedSecondSideThisLayer = true;
                            continue;
                        }
                        r--;
                        s++;
                    } else if (side === 2) {
                        q++;
                        r--;
                    } else if (side === 3) {
                        q++;
                        s--;
                    } else if (side === 4) {
                        r++;
                        s--;
                    } else if (side === 5) {
                        q--;
                        r++;
                    }

                    if (count < numHexagons) {
                        hexagons.push({ q, r, s });
                        count++;
                    }
                }
            }
            layers++;
            maxIterations++;
        }

        return hexagons;
    };

    const hexagons = generateHexagons(totalHexagons);

    return (
        <HexGrid
            width={screenSize.width}
            height={screenSize.height / 1.5}
            viewBox="-50 -40 100 100"
        >
            <Layout
                size={{
                    x: 10 - (screenSize.isLarge ? 0 : layers / 2),
                    y: 10 - (screenSize.isLarge ? 0 : layers / 2),
                }}
                flat={true}
                spacing={1.1}
                origin={{ x: 0, y: 10 }}
            >
                {hexagons.map((hex, index) => (
                    <Hexagon
                        key={index}
                        q={hex.q}
                        r={hex.r}
                        s={hex.s}
                    >
                        {/* TODO: add svg's for technologies */}
                    </Hexagon>
                ))}
            </Layout>
        </HexGrid>
    );
}

export default CircularHexGrid;
