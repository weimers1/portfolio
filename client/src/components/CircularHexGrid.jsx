import React from 'react';
import { HexGrid, Layout, Hexagon } from 'react-hexgrid';
import useScreenSize from '../hooks/useScreenSize';

function CircularHexGrid({ hexagonsContent }) {
    // track layer info
    let layers = 1;

    const screenSize = useScreenSize();

    const generateHexagons = (numHexagons) => {
        if (!hexagonsContent.length) return [];

        const hexagons = [
            { q: 0, r: 0, s: 0, hexagonContent: hexagonsContent[0] },
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
                        hexagons.push({
                            q,
                            r,
                            s,
                            hexagonContent: hexagonsContent[count],
                        });
                        count++;
                    }
                }
            }
            layers++;
            maxIterations++;
        }

        return hexagons;
    };

    const hexagons = generateHexagons(hexagonsContent.length);

    return (
        <HexGrid
            width={screenSize.width}
            height={screenSize.width}
            viewBox="-50 -40 120 120"
        >
            <Layout
                size={{
                    x: screenSize.isLarge ? 10 : 6,
                    y: screenSize.isLarge ? 10 : 6,
                }}
                flat={true}
                spacing={screenSize.isLarge ? 1 : 1.65}
                origin={{ x: 15, y: 10 }}
            >
                <use
                    href="#circle-background"
                    x={-45}
                    y={-45}
                />
                {hexagons.map((hex, index) => (
                    <Hexagon
                        key={index}
                        q={hex.q}
                        r={hex.r}
                        s={hex.s}
                        fill={'pattern-' + index}
                    >
                        <image
                            href={
                                hex.hexagonContent.svgFilePath
                                    ? hex.hexagonContent.svgFilePath
                                    : '/src/assets/images/default.svg'
                            }
                            alt={
                                hex.hexagonContent.name
                                    ? hex.hexagonContent.name
                                    : '?'
                            }
                            width={screenSize.isLarge ? '12' : '10' + '%'}
                            transform={`translate(${
                                screenSize.isLarge ? '-6' : '-5'
                            },${screenSize.isLarge ? '-6' : '-5'})`}
                        />
                    </Hexagon>
                ))}
            </Layout>
        </HexGrid>
    );
}

export default CircularHexGrid;
