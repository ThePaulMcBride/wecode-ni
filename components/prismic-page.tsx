import { RichText } from "prismic-reactjs";
import { Document } from "prismic-javascript/types/documents";

const PrismicPage = ({ document }: { document: Document }) => (
  <div className="container flex-1 mx-auto flex flex-col lg:flex-row py-6">
    <div className="lg:w-2/3 px-4 mx-auto mb-8 lg:mb-0">
      <div className="bg-white p-8 rounded shadow">
        <h1 className="text-gray-800 mb-2 font-semibold leading-tight text-4xl">
          {RichText.asText(document.data.title)}
        </h1>
        <main className="text-gray-800 prose prose-h2:text-lg max-w-none md:prose-lg prose-a:text-primary-500 prose-a:no-underline">
          <RichText render={document.data.content} />
        </main>
      </div>
    </div>
  </div>
);

export default PrismicPage;
