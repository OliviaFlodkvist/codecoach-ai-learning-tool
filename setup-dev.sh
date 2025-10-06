#!/bin/bash

# Setup development mode for CodeCoach
echo "🚧 Setting up CodeCoach Development Mode..."

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "Creating .env.local file..."
    cat > .env.local << EOF
DATABASE_URL="postgresql://postgres:myseacretpassword@localhost:5435/postgres"

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=2/TRV9I/fIF8hK//RyS5zaRGr+Thbxi8lpGr3KMz15M=

# GitHub OAuth (optional - you can use credentials login instead)
# GITHUB_ID=your_github_client_id
# GITHUB_SECRET=your_github_client_secret

# OpenAI API Key
OPENAI_API_KEY=your_openai_api_key_here

# Development Mode - Set to 'true' to skip OpenAI calls
SKIP_OPENAI=true
EOF
    echo "✅ Created .env.local file"
else
    echo "📝 .env.local already exists"
fi

# Check if SKIP_OPENAI is set
if grep -q "SKIP_OPENAI=true" .env.local; then
    echo "✅ Development mode is already enabled (SKIP_OPENAI=true)"
else
    echo "Adding SKIP_OPENAI=true to .env.local..."
    echo "" >> .env.local
    echo "# Development Mode - Set to 'true' to skip OpenAI calls" >> .env.local
    echo "SKIP_OPENAI=true" >> .env.local
    echo "✅ Development mode enabled"
fi

echo ""
echo "🎉 Development mode setup complete!"
echo ""
echo "How to use:"
echo "1. Start your dev server: npm run dev"
echo "2. Visit: http://localhost:3001/codecoach/summary?sessionId=3"
echo "3. The page will use mock data instead of calling OpenAI"
echo ""
echo "To disable development mode:"
echo "1. Set SKIP_OPENAI=false in .env.local"
echo "2. Restart your dev server"
