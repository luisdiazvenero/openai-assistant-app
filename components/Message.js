// components/Message.js
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'

const Message = ({ role, content }) => {
  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] p-3 rounded-lg ${
          role === 'user'
            ? 'bg-custom-orange text-white'
            : 'bg-gray-100 text-gray-900'
        }`}
      >
        {role === 'user' ? (
          <div className="whitespace-pre-wrap">{content}</div>
        ) : (
          <ReactMarkdown
            className="prose prose-sm max-w-none dark:prose-invert [&>*]:text-gray-900 prose-a:text-custom-orange prose-a:underline hover:prose-a:text-custom-orange-dark"
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
            components={{
              p: ({ children }) => <p className="mb-2">{children}</p>,
              h1: ({ children }) => <h1 className="text-2xl font-bold mb-4">{children}</h1>,
              h2: ({ children }) => <h2 className="text-xl font-bold mb-3">{children}</h2>,
              h3: ({ children }) => <h3 className="text-lg font-bold mb-2">{children}</h3>,
              ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
              li: ({ children }) => <li className="mb-1">{children}</li>,
              a: ({ children, href }) => (
                <a
                href={href}
                className="text-custom-orange underline hover:text-custom-orange-dark transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
              img: ({ src, alt }) => (
                <div className="block my-2">
                  <img
                    src={src}
                    alt={alt}
                    className="w-full sm:max-w-[320px] object-contain rounded-lg"
                  />
                </div>
              ),
              code: ({ node, inline, className, children, ...props }) => (
                <code
                  className={`${
                    inline
                      ? 'bg-gray-200 rounded px-1 py-0.5'
                      : 'block bg-gray-800 text-white rounded-lg p-2 overflow-x-auto'
                  } ${className || ''}`}
                  {...props}
                >
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre className="bg-gray-800 rounded-lg overflow-x-auto mb-4">
                  {children}
                </pre>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-custom-orange pl-4 italic my-2">
                  {children}
                </blockquote>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
};

export default Message;