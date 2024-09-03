import {
  SpecialZoomLevel,
  Viewer,
  Worker,
  type Plugin,
  type RenderViewer,
} from "@react-pdf-viewer/core";
import { thumbnailPlugin } from "@react-pdf-viewer/thumbnail";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";

interface PageThumbnailPluginProps {
  PageThumbnail: React.ReactElement;
}

export default function SheetThumbnailOld({ url }: { url: string }) {
  const thumbnailPluginInstance = thumbnailPlugin();
  const { Cover } = thumbnailPluginInstance;
  const pageThumbnailPluginInstance = pageThumbnailPlugin({
    PageThumbnail: <Cover getPageIndex={() => 0} width={420} />,
  });

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <Viewer
        plugins={[pageThumbnailPluginInstance, thumbnailPluginInstance]}
        fileUrl={url}
        defaultScale={SpecialZoomLevel.PageFit}
      />
    </Worker>
  );
}

const pageThumbnailPlugin = (props: PageThumbnailPluginProps): Plugin => {
  const { PageThumbnail } = props;

  return {
    renderViewer: (renderProps: RenderViewer) => {
      let { slot } = renderProps;

      slot.children = PageThumbnail;

      // Reset the sub slot
      slot.subSlot!.attrs = {};
      slot.subSlot!.children = <></>;

      return slot;
    },
  };
};
