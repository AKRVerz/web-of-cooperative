import { Document, Page, PDFViewer, Text } from '@react-pdf/renderer';
import React from 'react';
import useTopBarHeight from 'src/utils/useTopBarHeight';
import { pdfStyles as styles } from 'src/utils/styles';
import { DEFAULT_DOCUMENT_PROPS } from 'src/store/actions/resources/pembukuans';
import { KopSurat } from 'src/components/baseComponent/PDFComponents';
import RiwayatTableHead from 'src/components/baseComponent/PDFComponents/RiwayatTableHead';
import RiwayatTableRow from 'src/components/baseComponent/PDFComponents/RiwayatTableRow';

const ExportPdf = () => {
  const decreasor = useTopBarHeight();

  return (
    <PDFViewer
      style={{ width: '100%', height: `calc(100vh - ${decreasor}px)` }}
    >
      <Document {...DEFAULT_DOCUMENT_PROPS} subject={'Lamporan Pembukuan'}>
        <Page size="A4" style={styles.body}>
          <KopSurat />
          <Text style={styles.title}>Laporan Pembukuan</Text>
          <Text style={styles.text}>
            Rangkuman dari keseluruhan laporan pembukuan yang ada diringkas
            kedalam surat berikut :
          </Text>
          <RiwayatTableHead />
          <RiwayatTableRow />
          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
            fixed
          />
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default ExportPdf;
