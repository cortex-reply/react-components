import React, { useState, useEffect, useRef } from 'react';
import { Previewer } from 'pagedjs';
import { Button } from "@/components/ui/button";

export const Printable: React.FC<{ blocks: any[] }> = ({ blocks }) => {
    const previewContainer = useRef<HTMLDivElement>(null);
    const [isLandscape, setIsLandscape] = useState(false);
    const pagedRef = useRef(new Previewer());

    const updatePagedPreview = () => {
        if (!previewContainer.current || !document.getElementById('printable-content')) {
            console.error("Preview container or content is missing.");
            return;
        }

        const paged = pagedRef.current;
        previewContainer.current.innerHTML = '';
        
        paged.preview(document.getElementById('printable-content')!.innerHTML, [], previewContainer.current)
            .then(() => console.log("Paged.js re-rendered successfully."))
            .catch(error => console.error("Paged.js error:", error));
    };

    useEffect(() => {
        console.log("Initializing Paged.js preview...");
        updatePagedPreview();
    }, [blocks]);

    const toggleOrientation = () => {
        setIsLandscape((prev) => !prev);
        setTimeout(() => {
            if (previewContainer.current) {
                updatePagedPreview();
            }
        }, 200);
    };

    const handlePrint = async () => {
        console.log("Printing");
        
        await new Promise((resolve) => setTimeout(resolve, 100));
        window.print();
    };

    return (
        <div className="printable-container p-4">
            <div className="absolute bottom-4 right-4 flex gap-2 print-controls">
                <Button onClick={toggleOrientation} variant="outline">
                    {isLandscape ? 'A4 Portrait' : 'Landscape'}
                </Button>
                <Button onClick={handlePrint} variant="outline">
                    Print to PDF
                </Button>
            </div>

            <div
                id="printable-content"
                key={isLandscape ? "landscape" : "portrait"}
                className={isLandscape ? "landscape" : "portrait"}
                style={{ display: 'none' }}
            >
                {blocks.map((block, index) => (
                    <div key={index} className="print-section">
                        {block.content}
                    </div>
                ))}
            </div>

            <style jsx global>{`
                @page {
                    size: ${isLandscape ? "A4 landscape" : "A4 portrait"} !important;
                    margin: 0;
                }
                
                .pagedjs_page {
                    border: none !important;
                    box-shadow: none !important;
                }

                .print-section {
                    break-inside: avoid;
                    page-break-after: auto;
                }

                .title-page {
                    page: first;
                    text-align: center;
                    font-size: 24px;
                    font-weight: bold;
                    padding: 50px;
                }

                @media print {
                    .print-controls {
                        display: none !important;
                    }
                }
            `}</style>
        </div>
    );
};
