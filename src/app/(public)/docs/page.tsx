function DocsPage() {
  return (
    <div className="docs space-y-4">
      <h1 className="text-4xl font-bold">Quick Start</h1>
      <p>
        Bakan is a boilerplate for Next.js 15, designed to simplify the creation of modern
        applications with optimized initial configurations.
      </p>

      <hr />

      <h3>Prerequisites</h3>
      <p>
        Make sure you have the following installed on your system:
        <br />
        Node.js &gt;= 18
        <br />
        npm or yarn
      </p>

      <h3>Installation</h3>

      <p>1. Clone the repository:</p>
      <pre>
        git clone https://github.com/bannednull/bakan.git
        <br />
        cd bakan
      </pre>

      <p>2. Install dependencies:</p>
      <pre>npm install</pre>

      <p>
        3. Set up environment variables: <br /> Create a .env file in the project root based:
      </p>

      <pre>
        NEXT_PUBLIC_SITE_URL=http://localhost:3000 <br />
        DATABASE_URL <br />
        AUTH_SECRET <br />
        UPSTASH_REDIS_REST_URL <br />
        UPSTASH_REDIS_REST_TOKEN <br />
        SMTP_HOST=smtp.zoho.com <br />
        SMTP_USER <br />
        SMTP_PASSWORD <br />
        OPENAI_API_KEY <br />
        AUTH_GOOGLE_ID <br />
        AUTH_GOOGLE_SECRET <br />
        NEXT_PUBLIC_STRIPE_PUBLIC <br />
        STRIPE_SECRET_KEY <br />
        STRIPE_WEBHOOK_SECRET
      </pre>
    </div>
  );
}

export default DocsPage;
