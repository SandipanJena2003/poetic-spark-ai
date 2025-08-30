import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SearchBar from '@/components/SearchBar';
import PoemCard from '@/components/PoemCard';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Sparkles, TrendingUp, Star, Feather, BookOpen, Heart, Users } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Poem {
  id: string;
  title: string;
  content: string;
  category: string;
  likes_count: number;
  created_at: string;
  profiles: {
    id: string;
    display_name?: string;
    username?: string;
  } | null;
}

const Index = () => {
  const { user } = useAuth();
  const [featuredPoems, setFeaturedPoems] = useState<Poem[]>([]);
  const [trendingPoems, setTrendingPoems] = useState<Poem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'Love', icon: Heart, count: 156 },
    { name: 'Nature', icon: Feather, count: 98 },
    { name: 'Life', icon: Users, count: 203 },
    { name: 'Inspirational', icon: Sparkles, count: 87 }
  ];

  useEffect(() => {
    fetchPoems();
  }, []);

  const fetchPoems = async () => {
    try {
      // Fetch featured poems
      const { data: featured, error: featuredError } = await supabase
        .from('poems')
        .select(`
          *,
          profiles (id, display_name, username)
        `)
        .eq('is_published', true)
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
        .limit(3);

      if (featuredError) throw featuredError;

      // Fetch trending poems (most liked recently)
      const { data: trending, error: trendingError } = await supabase
        .from('poems')
        .select(`
          *,
          profiles (id, display_name, username)
        `)
        .eq('is_published', true)
        .order('likes_count', { ascending: false })
        .limit(6);

      if (trendingError) throw trendingError;

      setFeaturedPoems((featured as any) || []);
      setTrendingPoems((trending as any) || []);
    } catch (error) {
      console.error('Error fetching poems:', error);
      toast({
        title: "Error",
        description: "Failed to load poems. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Navigate to search results page or filter current results
    console.log('Searching for:', query);
  };

  const inspirationalQuotes = [
    "Poetry is the spontaneous overflow of powerful feelings: it takes its origin from emotion recollected in tranquility.",
    "Poetry is when an emotion has found its thought and the thought has found words.",
    "Poetry is the journal of the sea animal living on land, wanting to fly in the air."
  ];

  const currentQuote = inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)];

  return (
    <div className="min-h-screen bg-gradient-poetry">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          {/* Inspirational Quote */}
          <div className="mb-8">
            <blockquote className="text-lg md:text-xl font-poetry italic text-primary leading-relaxed max-w-4xl mx-auto">
              "{currentQuote}"
            </blockquote>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-6 animate-fade-in">
            Where Words
            <span className="block text-poetry-purple">Find Their Wings</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground font-serif mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover, share, and celebrate the art of poetry. Join a community of writers and readers 
            who believe in the power of words to move hearts and minds.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            {user ? (
              <Link to="/write">
                <Button size="lg" className="font-serif text-lg px-8 py-6">
                  <Feather className="mr-2 h-5 w-5" />
                  Start Writing
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button size="lg" className="font-serif text-lg px-8 py-6">
                  <Feather className="mr-2 h-5 w-5" />
                  Join Our Community
                </Button>
              </Link>
            )}
            <Link to="/categories">
              <Button variant="outline" size="lg" className="font-serif text-lg px-8 py-6">
                <BookOpen className="mr-2 h-5 w-5" />
                Explore Poetry
              </Button>
            </Link>
          </div>

          {/* Search Bar */}
          <SearchBar onSearch={handleSearch} className="animate-slide-up" />
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-serif font-bold text-center text-primary mb-12">
            Explore by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/category/${category.name.toLowerCase()}`}
                className="group"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-poetry-lavender hover:shadow-poetry transition-all duration-300 hover:-translate-y-1 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 bg-gradient-poetry rounded-full group-hover:scale-110 transition-transform duration-200">
                      <category.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-serif font-semibold text-primary mb-2">{category.name}</h3>
                  <p className="text-sm text-muted-foreground font-serif">{category.count} poems</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Poems */}
      {featuredPoems.length > 0 && (
        <section className="py-16 px-4 bg-white/30">
          <div className="container mx-auto">
            <div className="flex items-center justify-center mb-12">
              <Star className="h-6 w-6 text-poetry-gold mr-2" />
              <h2 className="text-3xl font-serif font-bold text-primary">Featured Poems</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredPoems.map((poem) => (
                <PoemCard
                  key={poem.id}
                  id={poem.id}
                  title={poem.title}
                  content={poem.content}
                  author={poem.profiles}
                  category={poem.category}
                  likes_count={poem.likes_count}
                  created_at={poem.created_at}
                  variant="featured"
                  className="animate-fade-in"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trending Poems */}
      {trendingPoems.length > 0 && (
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-center mb-12">
              <TrendingUp className="h-6 w-6 text-primary mr-2" />
              <h2 className="text-3xl font-serif font-bold text-primary">Trending Poems</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingPoems.map((poem) => (
                <PoemCard
                  key={poem.id}
                  id={poem.id}
                  title={poem.title}
                  content={poem.content}
                  author={poem.profiles}
                  category={poem.category}
                  likes_count={poem.likes_count}
                  created_at={poem.created_at}
                  className="animate-fade-in"
                />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/trending">
                <Button variant="outline" className="font-serif">
                  View All Trending Poems
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-card">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2">1,234</div>
              <div className="text-muted-foreground font-serif">Poems Published</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2">567</div>
              <div className="text-muted-foreground font-serif">Active Poets</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2">890</div>
              <div className="text-muted-foreground font-serif">Community Members</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2">12.3k</div>
              <div className="text-muted-foreground font-serif">Hearts Given</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
