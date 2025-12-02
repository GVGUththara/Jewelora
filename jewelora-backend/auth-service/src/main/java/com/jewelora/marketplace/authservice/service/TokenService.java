package com.jewelora.marketplace.authservice.service;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JOSEObjectType;
import com.nimbusds.jose.crypto.RSASSASigner;
import com.nimbusds.jwt.SignedJWT;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jose.jwk.RSAKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class TokenService {

    private final RSAKey rsaKey;
    private final long expirationMillis;
    private final String issuer;

    public TokenService(
            RSAKey rsaKey,
            @Value("${jwt.expiration-ms:3600000}") long expirationMillis,
            @Value("${jwt.issuer}") String issuer
    ) {
        this.rsaKey = rsaKey;
        this.expirationMillis = expirationMillis;
        this.issuer = issuer;
    }

    public String createAccessToken(String subject, String userId, List<String> roles) throws JOSEException {
        Date now = new Date();
        Date exp = new Date(now.getTime() + expirationMillis);

        JWTClaimsSet.Builder claimsBuilder = new JWTClaimsSet.Builder()
                .subject(subject)
                .issuer(issuer)  
                .issueTime(now)
                .expirationTime(exp)
                .claim("roles", roles)
                .claim("userId", userId);

        JWTClaimsSet claims = claimsBuilder.build();

        SignedJWT signedJWT = new SignedJWT(
                new JWSHeader.Builder(JWSAlgorithm.RS256)
                        .keyID(rsaKey.getKeyID())
                        .type(JOSEObjectType.JWT)
                        .build(),
                claims);

        RSASSASigner signer = new RSASSASigner(rsaKey.toPrivateKey());
        signedJWT.sign(signer);
        return signedJWT.serialize();
    }

    public long getExpirationMillis() {
        return expirationMillis;
    }
}