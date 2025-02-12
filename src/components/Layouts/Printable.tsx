'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Previewer } from 'pagedjs';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import logoDark from '../../images/cortex-reply-dark.png';
import logoLight from '../../images/cortex-reply-light.png';
import { Header } from '../HeaderFooter';

interface Section {
  sectionTitle: string;
  blocks: any[];
}

interface PrintableProps {
  sections: Section[];
  layout?: 'portrait' | 'landscape';
  titlePage?: React.ReactNode;
}

export const Printable: React.FC<PrintableProps> = ({ sections = [], layout = 'portrait', titlePage }) => {
  const { theme } = useTheme();
  const previewContainer = useRef<HTMLDivElement>(null);
  const pagedRef = useRef(new Previewer());
  const [pageCount, setPageCount] = useState<number>(0);

  const updatePagedPreview = useCallback(() => {
    if (!previewContainer.current || !document.getElementById('printable-content')) {
      console.error('Preview container or content is missing.');
      return;
    }

    const paged = pagedRef.current;
    paged.preview(document.getElementById('printable-content')!.innerHTML, [], previewContainer.current)
      .then(result => {
        console.log('Paged.js rendered successfully.');
        setPageCount(result.pageCount);
      })
      .catch(error => console.error('Paged.js error:', error));
  }, []);

  useEffect(() => {
    updatePagedPreview();
  }, [sections, layout, updatePagedPreview]);

  const handlePrint = async () => {
    console.log('Preparing document for print...');
    await new Promise(resolve => setTimeout(resolve, 300));
    window.print();
  };

  return (
    <div className="printable-container p-4">
      <div className="fixed top-28 left-4 flex gap-2 print-controls">
        <Button onClick={handlePrint} variant="outline">Print to PDF</Button>
      </div>
      <Header isMenuOpen={true} logoLight={logoLight} logoDark={logoDark} />
      
      <div id="printable-content" key={layout} className={layout}>
        {titlePage && (
          <div className="title-page">
            {titlePage}
            <Footer />
          </div>
        )}

        <div className="content">
          {sections.map((section, index) => (
            <div key={index} className="print-section">
              <h2 className="section-header text-2xl font-semibold mt-14 text-center">{section.sectionTitle}</h2>
              {section.blocks.map((block, blockIndex) => (
                <div key={blockIndex} className="block">
                  {block.type === 'image' ? (
                    <Image src={block.content} alt="" className="rounded shadow-md" />
                  ) : (
                    <p className="mt-4">{block.content}</p>
                  )}
                </div>
              ))}
              <Footer />
            </div>
          ))}
        </div>
      </div>

      <div ref={previewContainer} className="preview-container hidden"></div>

      <style jsx global>{`
        @page {
          size: ${layout === 'landscape' ? 'A4 landscape' : 'A4 portrait'} !important;
          margin: 0;
        }
        .title-page {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          page-break-before: always;
          margin: 0;
        }
        .print-section {
          page-break-inside: avoid;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .footer {
          width: 100%;
          text-align: center;
          font-size: 12px;
          color: gray;
          padding: 10px;
          margin-top: auto;
        }
        .print-controls { display: block; z-index: 1000; }
        @media print {
          .print-controls { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export const Footer: React.FC = () => {
  const { theme } = useTheme();
  return (
    <footer className="footer border-t flex justify-between items-center bg-white text-gray-600 dark:bg-gray-900 dark:text-gray-300">
      <div className="flex items-center space-x-2">
        <img src={theme === 'dark' ? logoDark.src : logoLight.src} alt="Reply Logo" className="h-6" />
        <span className="text-sm">technology, done right</span>
      </div>
      <a href="https://airwalkreply.com" className="text-sm hover:underline">airwalkreply.com</a>
    </footer>
  );
};
