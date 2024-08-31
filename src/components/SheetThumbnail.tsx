import {
  Viewer,
  Worker,
  type Plugin,
  type RenderViewer,
} from "@react-pdf-viewer/core";
import { thumbnailPlugin } from "@react-pdf-viewer/thumbnail";

interface PageThumbnailPluginProps {
  PageThumbnail: React.ReactElement;
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

export default function SheetThumbnail({ url }: { url: string }) {
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
      />
    </Worker>
  );
}
