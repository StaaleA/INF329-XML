<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method='xml' version='1.0' indent='yes' encoding="iso-8859-1"/>

<xsl:template match="/">

<sted>
	<stedsnavn>
		<xsl:value-of select="weatherdata/location/name"/>
	</stedsnavn>

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
			<xsl:for-each select="/weatherdata/forecast/tabular/time">
			
				<tidspunkt>
					<xsl:attribute name="fratid">
						<xsl:value-of select="@from"/>
					</xsl:attribute>

					<xsl:attribute name="tiltid">
						<xsl:value-of select="@to"/>
					</xsl:attribute>

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
			<xsl:for-each select="/weatherdata/forecast/text/location/time">
			
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
	</melding>

</sted>

</xsl:template>
</xsl:stylesheet>