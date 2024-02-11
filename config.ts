const tags = [
  { value: "javascript", label: "JavaScript" },
  { value: "front-end", label: "Front End" },
  { value: "ruby", label: "Ruby" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "c#", label: "C#" },
  { value: "c++", label: "C++" },
  { value: "c", label: "C" },
  { value: "php", label: "PHP" },
  { value: "rust", label: "Rust" },
  { value: "go", label: "Go" },
  { value: "swift", label: "Swift" },
  { value: "ios", label: "iOS" },
  { value: "android", label: "Android" },
  { value: "kotlin", label: "Kotlin" },
  { value: "objective-c", label: "Objective C" },
  { value: "sql", label: "SQL" },
  { value: "angular", label: "Angular" },
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "node.js", label: "Node.js" },
  { value: "ruby-on-rails", label: "Ruby on Rails" },
  { value: "laravel", label: "Laravel" },
  { value: "spring", label: "Spring" },
  { value: "django", label: "Django" },
  { value: "agile", label: "Agile" },
].sort((a, b) => {
  var nameA = a.value.toUpperCase(); // ignore upper and lowercase
  var nameB = b.value.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
});

const config = {
  url: "https://wecodeni.com",
  title: "WeCode NI",
  tagline: "Northern Ireland's best software development and tech jobs",
  pricing: 5000,
  currency: "gbp",
  currencySymbol: "£",
  price_key: "job_50",
  description:
    "Northern Ireland's best software development and tech jobs. WeCode NI is a service built by developers for developers.",
  email: "info@wecodeni.com",
  twitterHandle: "@wecodeni",
  twitterUrl: "https://twitter.com/wecodeni",
  linkedInUrl: "https://linkedin.com/company/wecodeni",
  newsletterUrl:
    "https://wecodeni.us18.list-manage.com/subscribe/post?u=afc6a2a66cc711af3903fdb9a&id=b6fec602ad",
  prismicUrl: "https://wecode-ni.prismic.io/api/v2",
  tags,
};

export default config;
