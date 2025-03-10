import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return[
      {
        source:"/api/:path*",
        headers:[
          {key:'Access-Control-Allow-Credentials', value:'true'},
          {key:'Access-Control-Allow-Origin', value:'http://localhost:4200'},
          {key:'Access-Control-Allow-Origin', value:'https://next-angular-blog-app-frontend.vercel.app'},{key:'Access-Control-Allow-Methods', value:'GET, POST, PUT, DELETE, OPTIONS , PATCH'},
          {key:'Access-Control-Allow-Headers', value:'X-CSRF-Token, X-Requested-With, Content-Type, Accept, Authorization,Accept,Accept-version,Content-Length,Content-Type,Date,X-Api-Version,Content-MD5'},
          
        ]
      },
    ]
  }
};

export default nextConfig;
