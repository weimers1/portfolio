import React from 'react';
import { HexGrid, Layout, Hexagon, Text } from 'react-hexgrid';
import useScreenSize from '../hooks/useScreenSize';

function CircularHexGrid({ hexagonContent }) {
    // track layer info
    let outsideLayerAmountMax = 0;
    let layers = 1;

    const screenSize = useScreenSize();

    const generateHexagons = (numHexagons) => {
        if (!hexagonContent.length) return [];

        const hexagons = [
            { q: 0, r: 0, s: 0, svgFilePath: hexagonContent[0].svgFilePath },
        ];

        if (numHexagons <= 1) return hexagons;

        // count the hexagons that get added to the array
        let count = 1;

        // initialize coordinates
        let q = 0;
        let r = 0;
        let s = 0;

        // set maximum number of iterations
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
                    outsideLayerAmountMax = layers * 6;

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

    const hexagons = generateHexagons(hexagonContent.length);

    const getViewBox = () => {
        const numHexagonsTotal = hexagonContent.length;
        const numHexagonsOuterLayer =
            numHexagonsTotal - (outsideLayerAmountMax + 1);
        return `-5${
            numHexagonsOuterLayer < Math.floor(outsideLayerAmountMax / 2)
                ? '5'
                : '0'
        } ${screenSize.isLarge ? '-40' : '-30'} 100 100`;
    };

    return (
        <HexGrid
            width={screenSize.width}
            height={screenSize.height / 1.2}
            viewBox={getViewBox()}
        >
            <Layout
                size={{
                    x: 10 - (screenSize.isLarge ? layers / 2 : layers / 1.5),
                    y: 10 - (screenSize.isLarge ? layers / 2 : layers / 1.5),
                }}
                flat={true}
                spacing={1.1}
                origin={{ x: 0, y: 15 }}
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
