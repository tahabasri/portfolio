# Injects customer HTML snippets into pages during Jekyll build
# Looks for elements with data-id="customers" and a data-name attribute,
# then includes content from customers/<name>-customers.html into the element.

require 'nokogiri'

module Portfolio
  class CustomersInjector
    def initialize(site)
      @site = site
      @source = site.source
    end

    def process_doc(doc)
      return unless doc.output_ext == '.html'
      return unless doc.output && !doc.output.empty?

      doc.output = inject_customers(doc.output)
    end

    private

    def inject_customers(html)
      # Parse the full HTML document to preserve doctype, html/head/body
      doc = Nokogiri::HTML.parse(html)

      doc.css('[data-id="customers"]').each do |node|
        name = node['data-name']&.strip
        next if name.nil? || name.empty?

        file_path = File.join(@source, 'customers', "#{name}-customers.html")
        next unless File.file?(file_path)

        begin
          content = File.read(file_path, encoding: 'UTF-8')
          # Replace node's inner HTML with the file content
          node.children.remove
          fragment = Nokogiri::HTML::DocumentFragment.parse(content)
          node.add_child(fragment)
        rescue => e
          warn "[customers_injector] Failed to include #{file_path}: #{e.message}"
        end
      end

  doc.to_html
    end
  end
end

Jekyll::Hooks.register [:pages, :documents], :post_render do |doc|
  # Only run for pages/documents that belong to the site
  site = doc.site
  injector = (site.config[:_customers_injector] ||= Portfolio::CustomersInjector.new(site))
  injector.process_doc(doc)
end
