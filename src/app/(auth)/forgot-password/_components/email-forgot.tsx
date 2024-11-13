import { getURL } from '@/lib/utils';
import { Html, Button, Container, Heading, Text, Body } from '@react-email/components';

function ForgotPassword({ token }: { token: string }) {
  return (
    <Html lang="en">
      <Body style={{ background: '#ebf5fb' }}>
        <Container style={{ background: '#ffffff', textAlign: 'center', padding: '20px' }}>
          <Heading as="h1">Hello, you have requested to reset your password.</Heading>
          <Text>
            We received a request to reset your password. If you didn&apos;t make this request, you
            can safely ignore this email.
          </Text>
          <Button
            href={getURL('/reset-password') + `?token=${token}`}
            style={{
              background: '#3498db',
              padding: '10px',
              borderRadius: '8px',
              color: '#ffffff',
            }}
          >
            Click here to reset your password
          </Button>
          <Text>This link will expire in 24 hours.</Text>
        </Container>
      </Body>
    </Html>
  );
}

export default ForgotPassword;
