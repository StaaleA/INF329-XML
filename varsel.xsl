<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method='xml' version='1.0' indent='yes' encoding="UTF-8" />

<xsl:template match="/">

<xsl:comment>Denne siden er utviklet av Ståle Andre Volden siste gang endret 21.11.2015
Denne siden er kontrollert av Ståle Andre Volden, siste gang 21.11.2015</xsl:comment>

<sted>	
	<stedsnavn>
		<xsl:value-of select="weatherdata/location/name"/>
	</stedsnavn>
	<type>
		<xsl:value-of select="weatherdata/location/type"/>
	</type>

	<kordinater>
		<xsl:attribute name="latitude">
	    	<xsl:value-of select="weatherdata/location/location/@latitude"/>
	  	</xsl:attribute>

	  <xsl:attribute name="longitude">
	    	<xsl:value-of select="weatherdata/location/location/@longitude"/>
	  </xsl:attribute>

	    <xsl:attribute name="elevation">
	    	<xsl:value-of select="weatherdata/location/elevation"/>
	  </xsl:attribute>
	</kordinater>

	<melding>
		<detaljert>
			<xsl:for-each select="weatherdata/forecast/tabular/time">
			
				<tidspunkt>
					<xsl:attribute name="fratid">
						<xsl:value-of select="@from"/>
					</xsl:attribute>

					<xsl:attribute name="tiltid">
						<xsl:value-of select="@to"/>
					</xsl:attribute>
						<xsl:attribute name="periode">
						<xsl:value-of select="@period"/>
					</xsl:attribute>
					<symbol>
						<xsl:attribute name="nr">
						<xsl:value-of select="symbol/@var"/>
						</xsl:attribute>

						<xsl:attribute name="tekst">
						<xsl:value-of select="symbol/@name"/>
						</xsl:attribute>

					</symbol>
					<temperatur>
						<xsl:value-of select="temperature/@value"/>
					</temperatur>

					<vind>
						<xsl:attribute name="mps">
							<xsl:value-of select="windSpeed/@mps"/>
						</xsl:attribute>

						<xsl:attribute name="tekst">
							<xsl:value-of select="windSpeed/@name"/>
						</xsl:attribute>

						<xsl:attribute name="retningKode">
							<xsl:value-of select="windDirection/@code"/>
						</xsl:attribute>

						<xsl:attribute name="retningTekst">
							<xsl:value-of select="windDirection/@name"/>
						</xsl:attribute>
					</vind>
				</tidspunkt>
			</xsl:for-each>	
		</detaljert>
		<tekst>
			<xsl:for-each select="weatherdata/forecast/text/location/time">
			
				<tidspunkt>
					<xsl:attribute name="fratid">
						<xsl:value-of select="@from"/>
					</xsl:attribute>

					<xsl:attribute name="tiltid">
						<xsl:value-of select="@from"/>
					</xsl:attribute>

					<tekst>
						<xsl:value-of select="body"/>
					</tekst>

				</tidspunkt>
			</xsl:for-each>
		</tekst>
		<oppdatert>
			<xsl:attribute name="sist">
				<xsl:value-of select="weatherdata/meta/lastupdate"/>
			</xsl:attribute>
			<xsl:attribute name="neste">
				<xsl:value-of select="weatherdata/meta/nextupdate"/>
			</xsl:attribute>
		</oppdatert>
	</melding>
	<linker>
		<googlemap>
		<xsl:attribute name="type">
			<xsl:value-of select="weatherdata/googlemap/@type"/>
		</xsl:attribute>
		<xsl:attribute name="tekst">
			<xsl:value-of select="weatherdata/googlemap/@tekst"/>
		</xsl:attribute>
		<xsl:attribute name="linkurl">
			<xsl:value-of select="weatherdata/googlemap/@linkurl"/>
		</xsl:attribute>
		<xsl:attribute name="bildeurl">
			<xsl:value-of select="weatherdata/googlemap/@bildeurl"/>
		</xsl:attribute>
		</googlemap>
		<norgeskart>
		<xsl:attribute name="type">
			<xsl:value-of select="weatherdata/norgeskart/@type"/>
		</xsl:attribute>
		<xsl:attribute name="tekst">
			<xsl:value-of select="weatherdata/norgeskart/@tekst"/>
		</xsl:attribute>
		<xsl:attribute name="linkurl">
			<xsl:value-of select="weatherdata/norgeskart/@linkurl"/>
		</xsl:attribute>
		<xsl:attribute name="bildeurl">
			<xsl:value-of select="weatherdata/norgeskart/@bildeurl"/>
		</xsl:attribute>
		</norgeskart>
	</linker>

	<wikipedia>
		<xsl:attribute name="url">
			<xsl:value-of select="weatherdata/wikipediaurl" />
		</xsl:attribute>
		<tekst>
			<xsl:value-of select="weatherdata/wikipediatekst" />
		</tekst>
	</wikipedia>

	<credit>
		<xsl:attribute name="tekst">
		<xsl:value-of select="weatherdata/credit/link/@text"/>
		</xsl:attribute>
		<xsl:attribute name="url">
			<xsl:value-of select="weatherdata/credit/link/@url"/>
		</xsl:attribute>
	</credit>
</sted>

</xsl:template>

</xsl:stylesheet>