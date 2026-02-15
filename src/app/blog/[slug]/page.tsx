import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { articles, getArticleBySlug, getRelatedArticles } from "@/data/articles";
import BlogArticle from "@/components/BlogArticle";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article introuvable" };

  return {
    title: `${article.title} | Partir Vivre en Thaïlande`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.image }],
      type: "article",
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const relatedArticles = getRelatedArticles(slug, 3);

  return <BlogArticle article={article} relatedArticles={relatedArticles} />;
}
