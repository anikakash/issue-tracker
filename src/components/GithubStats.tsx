import React from 'react';
import styled from 'styled-components';
import { Card, Avatar, Row, Col } from 'antd';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import DataCard from './atmos/DataCard';

const GithubContainer = styled.div`
  margin-top: 20px;
`;

const SectionTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 600;
`;

const ProfileCard = styled(Card)`
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const UserInfo = styled.div`
  margin-left: 16px;
`;

const Username = styled.h3`
  margin: 0;
  font-size: 18px;
`;

const UserBio = styled.p`
  margin: 4px 0 0;
  color: #666;
`;

const ChartContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  height: 350px;
`;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const GithubStats: React.FC = () => {
  // Dummy data for commits per day
  const githubStats = {
    userData: {
      avatar_url: 'https://avatars.githubusercontent.com/u/12345678?v=4',
      name: 'Anik Akash',
      followers: 120,
      following: 45,
      public_repos: 30,
    },
    commitActivity: {
      // Data for each day of the month (e.g., 30 days for June)
      data: [
        5, 10, 0, 12, 8, 15, 18, 0, 9, 13, 7, 20, 11, 10, 5, 3, 2, 8, 0, 10, 5, 0, 14, 7, 10, 6, 8, 0, 4, 12,
      ],
      // Labels for each day of the month (e.g., June 1st, June 2nd, etc.)
      labels: [
        '2025-06-01', '2025-06-02', '2025-06-03', '2025-06-04', '2025-06-05', '2025-06-06', '2025-06-07',
        '2025-06-08', '2025-06-09', '2025-06-10', '2025-06-11', '2025-06-12', '2025-06-13', '2025-06-14',
        '2025-06-15', '2025-06-16', '2025-06-17', '2025-06-18', '2025-06-19', '2025-06-20', '2025-06-21',
        '2025-06-22', '2025-06-23', '2025-06-24', '2025-06-25', '2025-06-26', '2025-06-27', '2025-06-28',
        '2025-06-29', '2025-06-30',
      ],
    },
    activityBreakdown: [
      { commits: 40, pullRequests: 10, issues: 5, codeReviews: 15 },
      { commits: 20, pullRequests: 5, issues: 2, codeReviews: 10 },
      { commits: 30, pullRequests: 8, issues: 3, codeReviews: 8 },
    ],
  };

  const { userData, commitActivity, activityBreakdown } = githubStats;

  return (
    <GithubContainer>
      <SectionTitle>GitHub Stats</SectionTitle>
      
      {userData && (
        <ProfileCard>
          <ProfileInfo>
            <Avatar size={64} src={userData.avatar_url} />
            <UserInfo>
              <Username>{userData.name || 'Anik Akash'}</Username>
              <UserBio>@anikakash</UserBio>
            </UserInfo>
          </ProfileInfo>
          
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <DataCard title="Followers" value={userData.followers} />
            </Col>
            <Col xs={24} sm={8}>
              <DataCard title="Following" value={userData.following} />
            </Col>
            <Col xs={24} sm={8}>
              <DataCard title="Repositories" value={userData.public_repos} />
            </Col>
          </Row>
        </ProfileCard>
      )}
      
      <Row gutter={16}>
        <Col xs={24} lg={14}>
          <ChartContainer>
            <SectionTitle>Commit Frequency</SectionTitle>
            <ResponsiveContainer width="100%" height="85%">
              <LineChart
                data={commitActivity.labels.map((label, index) => ({
                  name: label,
                  commits: commitActivity.data[index],
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="commits"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Col>
        
        <Col xs={24} lg={10}>
          <ChartContainer>
            <SectionTitle>Activity Breakdown</SectionTitle>
            <ResponsiveContainer width="100%" height="85%">
              <PieChart>
                <Pie
                  data={activityBreakdown.length > 0
                    ? [
                        { name: 'Commits', value: activityBreakdown.reduce((sum, repo) => sum + repo.commits, 0) },
                        { name: 'Pull Requests', value: activityBreakdown.reduce((sum, repo) => sum + repo.pullRequests, 0) },
                        { name: 'Issues', value: activityBreakdown.reduce((sum, repo) => sum + repo.issues, 0) },
                        { name: 'Code Reviews', value: activityBreakdown.reduce((sum, repo) => sum + repo.codeReviews, 0) },
                      ]
                    : []}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {activityBreakdown.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Col>
      </Row>
    </GithubContainer>
  );
};

export default GithubStats;
